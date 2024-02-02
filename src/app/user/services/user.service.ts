import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  addUser(data: CreateUserRequest) {
    const user = this.userRepo.create({
      email: data.email,
      password: data.password,
      first_name: data.first_name || null,
      last_name: data.last_name || null,
    });

    return this.userRepo.save(user);
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
