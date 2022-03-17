import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateEmpAddress } from './CreateEmpAddress.dto';

export class CreateEmployee {
  id: number;
  image: string;
  empCode: string;
  title: number;
  firstName: string;
  lastName: string;
  nickName: string;
  titleEn: number;
  firstNameEn: string;
  lastNameEn: string;
  nickNameEn: string;
  gender: number;
  birthDate: Date;
  religion: number;
  nationality: number;
  identificationNo: string;
  identityExpire: Date;
  passportNo: string;
  passportExpire: Date;

  @IsNotEmpty()
  companyId: number;

  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;

  @IsNotEmpty()
  isDeleted: boolean;

  userId: number;

  @ValidateNested()
  @Type(() => CreateEmpAddress)
  address: CreateEmpAddress;
}
