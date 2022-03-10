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

  @Get('/active/:id')
  async activeRegister(@Param('id') id: any, @Res() res: Response) {
    const Register = await this.registerService.findRegisterByID(
      this.encryptService.DecodeKey(id),
    );

    try {
      await this.registerService.activateRegister(Register);
      return res.status(200).send({ msg: 'Active Successfully' });
    } catch (err) {
      return res.status(400).send({ msg: err });
    }
  }
}
