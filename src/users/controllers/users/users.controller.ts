import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  async getByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user.data);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.getUserByID(id);
      if (user) return new SerializedUser(user.data);
      else {
        throw new UserNotFoundException();
      }
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.updateUser(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  // deleteUser(@Param('id', ParseIntPipe) id: number) {
  deleteUser(@Body() user: deleteDto) {
    return this.userService.deleteUser(user);
  }
}
