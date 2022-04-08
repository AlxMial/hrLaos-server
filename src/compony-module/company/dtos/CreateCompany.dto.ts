import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateCompanyAddress } from './CreateCompanyAddress';
import { CreateCompanyHoliday } from './CreateCompanyHoliday';
import { CreateCompanyWorkingDay } from './CreateCompanyWorkingDay';

export class CreateCompany {
  id: number;
  companyCode: string;
  @IsNotEmpty()
  companyName: string;
  companyNameEn: string;
  @IsNotEmpty()
  companyType: number;
  businessType: number;
  programStartDate: Date;
  image: string;
  taxNo: string;
  taxBranchNo: string;
  registerId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  @IsNotEmpty()
  isDeleted: boolean;
  @IsNotEmpty()
  isActive: boolean;
  userId: number;

  @ValidateNested()
  @Type(() => CreateCompanyAddress)
  // @IsNotEmptyObject()
  companyAddress: CreateCompanyAddress;

  @ValidateNested()
  @Type(() => CreateCompanyHoliday)
  // @IsNotEmptyObject()
  companyHoliday: CreateCompanyHoliday;

  @ValidateNested()
  @Type(() => CreateCompanyWorkingDay)
  // @IsNotEmptyObject()
  companyWorking: CreateCompanyWorkingDay;
}
