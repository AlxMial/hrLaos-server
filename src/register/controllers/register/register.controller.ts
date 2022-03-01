import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { RegisterService } from 'src/register/services/register/register.service';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('REGISTER_SERVICE')
    private readonly registerService: RegisterService,
  ) {}
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateRegisterDto) {
    return this.registerService.createUser(createUserDto);
  }
}
