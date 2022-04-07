import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/types';
import { comparePasswords } from 'src/utils/bcrypt';
import { StatusMessage } from 'src/utils/StatusMessage';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // async validateUser(username: string, password: string) {
  //   const data = { data: null, isResult: true, message: '' };
  //   const userDB = await this.userService.findUserByUsername(username);
  //   if (userDB) {
  //     const matched = comparePasswords(password, userDB.password);
  //     if (matched) {
  //       data.data = userDB;
  //       data.isResult = true;
  //       return data;
  //     } else {
  //       data.isResult = false;
  //       data.message = 'Password do not match';
  //       return data;
  //     }
  //   }
  //   data.isResult = false;
  //   data.message = 'User Validation Failed!';
  //   return data;
  // }

  async validateUser(username: string, password: string): Promise<any> {
    const data = { data: null, isResult: true, message: '' };
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        data.data = userDB;
        data.isResult = true;
        return data;
      } else {
        data.isResult = false;
        data.message = 'Password do not match';
        return data;
      }
    }
    data.isResult = false;
    data.message = 'User Validation Failed!' + ' : username: ' + username;
    return data;
  }

  async login(user: any) {
    const validate = await this.validateUser(user.body.username, user.body.password);
    if (validate.isResult) {
      const payload = {
        username: user.user.data.userName,
        sub: user.user.data.id,
      };
      return {
        data: user.user.data,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return validate;
    }
  }
}
