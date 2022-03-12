import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  titleName: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isActivate: boolean;
}
