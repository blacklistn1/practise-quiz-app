import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest, CreateUserResponse } from '../schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async addUser(data: CreateUserRequest) {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(data.password, 8);

    const user = this.userRepo.create({
      email: data.email,
      password: hashedPassword,
      first_name: data.first_name || null,
      last_name: data.last_name || null,
    });

    const newUser = await this.userRepo.save(user);
    return new CreateUserResponse({
      id: newUser.id,
      email: newUser.email,
      name: newUser.full_name,
    });
  }
}
