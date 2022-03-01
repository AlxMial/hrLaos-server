import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  ValidateNested,
} from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  CompanyName: string;

  @IsNumberString()
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

  // ,[CompanyName]
  // ,[TitleName]
  // ,[FirstName]
  // ,[LastName]
  // ,[Phone]
  // ,[Email]
  // ,[Password]
  // ,[IsActivate]
  // ,[ActivateDate]
  // ,[RegisterDate]
  // ,[NumberOfEmp]
}
