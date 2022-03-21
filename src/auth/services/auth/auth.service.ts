import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { StatusMessage } from 'src/utils/StatusMessage';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        return userDB; //StatusMessage(true, null, userDB.data);
      } else {
        return { message: 'Password do not match' }; //StatusMessage(false, 'Password do not match', null);
      }
    }
    return { message: 'User Validation Failed!' }; //StatusMessage(false, 'User Validation Failed!', null);
  }
}
