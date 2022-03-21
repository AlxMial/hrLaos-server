import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Res,
} from '@nestjs/common';
import { RegisterService } from 'src/register/services/register/register.service';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { EncryptService } from 'src/utils/crypto';
import { Response } from 'express';
import { StatusMessage } from 'src/utils/StatusMessage';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('REGISTER_SERVICE')
    private readonly registerService: RegisterService,
    private encryptService: EncryptService,
  ) {}
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateRegisterDto) {
    return this.registerService.createUser(createUserDto);
  }

  @Get('/activate/:id')
  async activeRegister(@Param('id') id: any) {
    const Register = await this.registerService.findRegisterByID(
      this.encryptService.DecodeKey(id),
    );
    try {
      // const status = await this.registerService.activateRegister(Register.data);
      return await this.registerService.activateRegister(Register);
    } catch (err) {
      return (err as Error).message; //StatusMessage(true, (err as Error).message, null);
    }
  }
}
