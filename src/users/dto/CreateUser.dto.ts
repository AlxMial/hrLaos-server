import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  empId: number;

  @IsNotEmpty()
  @MaxLength(100)
  userName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  isActivate: boolean;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  isDeleted: boolean;
}
