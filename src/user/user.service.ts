import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'db/entities';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    const exsistUser = await this.userRepository.findOne({
      where: {
        email: CreateUserDto.email,
      },
    });
    if (exsistUser) throw new BadRequestException('user with this email exist');

    const user = await this.userRepository.save({
      email: CreateUserDto.email,
      password: await bcrypt.hash(CreateUserDto.password, 10),
    });
    return { user };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
