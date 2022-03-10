import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  EmpID: string;

  @IsNotEmpty()
  @MaxLength(100)
  UserName: string;

  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  Role: string;

  @IsNotEmpty()
  IsActivate: boolean;

  @IsNotEmpty()
  CompanyID: number;
}
