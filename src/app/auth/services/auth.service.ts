import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import {
  CreateUserRequest,
  LoginRequest,
} from '../../user/schemas/user.schema';
import { AuthResponse } from '../schemas/auth.schema';
import { BaseResponse } from '../../../project/common/base.response';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserRequest) {
    const existingUser = await this.userService.findOneByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(body.password, 8);
    const user = await this.userService.addUser({
      email: body.email,
      password: hashedPassword,
      first_name: body.first_name || null,
      last_name: body.last_name || null,
    });
    const payload = {
      id: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return new BaseResponse({
      status_code: HttpStatus.OK,
      data: new AuthResponse({
        access_token,
      }),
    });
  }

  async login(body: LoginRequest) {
    const user = await this.userService.findOneByEmail(body.email);
    if (!user || !(await compare(body.password, user.password))) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const payload = {
      id: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return new BaseResponse({
      status_code: HttpStatus.OK,
      data: new AuthResponse({
        access_token,
      }),
    });
  }
}
