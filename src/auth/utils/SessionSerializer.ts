import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { tbUser } from '../../typeorm';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(UserName: tbUser, done: (err, UserName: tbUser) => void) {
    return done(null, UserName);
  }

  async deserializeUser(
    UserName: tbUser,
    done: (err, UserName: tbUser) => void,
  ) {
    console.log('deserializeUser');
    const userDB = await this.userService.findUserById(UserName.UserID);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
