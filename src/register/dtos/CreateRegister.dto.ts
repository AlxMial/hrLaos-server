import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  CompanyName: string;

  @IsNotEmpty()
  TitleName: number;

  @IsNotEmpty()
  FirstName: string;

  @IsNotEmpty()
  LastName: string;

  @IsNotEmpty()
  Phone: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  IsActivate: boolean;
}
