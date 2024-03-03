import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'db/entities';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtServise: JwtService,
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
      token: '',
      tasks: { new: [], progress: [], complete: [] },
    });

    const token = this.jwtServise.sign({ id: user.id, email: user.email });

    await this.userRepository.update({ id: user.id }, { token });

    return {
      complete: true,
      data: { user: user.id, email: user.email, token },
    };
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async updateTasks(req, { tasks }) {
    const { id, email } = req.user;

    await this.userRepository.update({ id }, { tasks });

    return {
      complete: true,
      data: { id, email, tasks },
    };
  }

  async updateToken(id, token) {
    await this.userRepository.update({ id }, { token });

    return {
      token,
    };
  }
}
