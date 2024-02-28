import { Injectable } from '@nestjs/common';
import { users } from '../mocs';

@Injectable()
export class UserService {
  getUsers() {
    return users;
  }
}
