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
  @IsNotEmpty()
  @MaxLength(100)
  OrgName: string;

  @IsNotEmpty()
  @MaxLength(25)
  OrgType: string;

  @IsNotEmpty()
  IsFiscalYear: boolean;

  @IsNotEmpty()
  IsCalFiscalYear: boolean;

  @IsNotEmpty()
  IsCalLeaveFiscalYear: boolean;

  @IsNotEmpty()
  CompanyID: number;

  @IsNotEmpty()
  IsDeleted: boolean;

  //   @ValidateNested()
  //   @Type(() => CreateOrgAddress)
  //   @IsNotEmptyObject()
  //   address: CreateOrgAddress;
}
