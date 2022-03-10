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
} from '@nestjs/common';
import { RegisterService } from 'src/register/services/register/register.service';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { EncryptService } from 'src/utils/crypto';

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
  activeRegister(@Param('id') id: any) {
    const register = this.registerService.findRegisterByID(
      this.encryptService.DecodeKey(id),
    );
    // if (register) {
    //   this.registerService.activeRegister(register);
    // } else
    //   throw new HttpException('Customer Not Found!', HttpStatus.BAD_REQUEST);
  }
}
