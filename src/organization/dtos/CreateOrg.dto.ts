import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateOrgAddress } from './CreateOrgAddress.dto';

export class CreateOrg {
  id: number;
  orgCode: string;

  @IsNotEmpty()
  @MaxLength(100)
  orgName: string;

  orgNameEng: string;

  @IsNotEmpty()
  @MaxLength(25)
  orgType: string;

  businessType: number;
  beginProgram: Date;
  image: Buffer;
  taxNo: string;
  taxBranchNo: string;

  @IsNotEmpty()
  isFiscalYear: boolean;

  @IsNotEmpty()
  isCalLeaveFiscalYear: boolean;

  dateStartYear: Date;
  monthStartYear: number;
  yearCount: number;
  hourPerDay: string;
  dayPerMonth: string;

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
  //   @Type(() => CreateOrgAddress)
  //   @IsNotEmptyObject()
  //   address: CreateOrgAddress;
}
