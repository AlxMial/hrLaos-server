import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateEmpAddress } from './CreateEmpAddress.dto';

export class CreateEmployee {
  id: number;
  image: Buffer;
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
  maritalStatus: number;

  @IsNotEmpty()
  isOver65: boolean;

  @IsNotEmpty()
  orgId: number;

  maritalDate: Date;
  militaryStatus: number;
  exemptReason: string;

  @IsNotEmpty()
  companyId: number;

  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;

  @IsNotEmpty()
  isDeleted: boolean;

  userId: number;

  //   @ValidateNested()
  //   @Type(() => CreateEmpAddress)
  //   @IsNotEmptyObject()
  //   address: CreateEmpAddress;
}
