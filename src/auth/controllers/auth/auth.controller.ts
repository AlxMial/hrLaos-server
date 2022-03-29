import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    // const data = await this.authService.validateUser(
    //   req.body.username,
    //   req.body.password,
    // );
    // const jwt = await this.jwtService.signAsync({ id: data.data.id });
    // response.cookie('jwt', jwt, { httpOnly: true });
    return this.authService.login(req);
    //return data;
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('NESTJS_SESSION_ID');
    return new HttpException('Logout Success', HttpStatus.OK);
  }
}
