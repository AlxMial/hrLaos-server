import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  empId: number;

  @IsNotEmpty()
  @MaxLength(100)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  isActivate: boolean;

  @IsNotEmpty()
  companyId: number;

  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;

  @IsNotEmpty()
  isDeleted: boolean;

  userId: number;
}
