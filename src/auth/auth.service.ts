import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException('email or password wrong');
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new UnauthorizedException('email or password wrong');
    }
    if (user && passwordCompare) {
      return user;
    }
    return null;
  }
  async logIn(user: IUser) {
    const { id, email } = user;

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    await this.userService.updateToken(id, token);

    return {
      user: id,
      email,
      token,
    };
  }

  async logOut({ user }) {
    await this.userService.updateToken(user.id, '');
  }

  async getCurrent(req) {
    const { email } = req.user;
    const user = await this.userService.findOne(email);
    return {
      complete: true,
      data: {
        id: user.id,
        email: user.email,
        tasks: user.tasks,
      },
    };
  }
}
