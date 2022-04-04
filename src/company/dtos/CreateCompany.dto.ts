import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class CreateCompany {
  id: number;
  companyCode: string;
  @IsNotEmpty()
  companyName: string;
  companyNameEn: string;
  @IsNotEmpty()
  companyType: string;
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
  userId: number;
}
