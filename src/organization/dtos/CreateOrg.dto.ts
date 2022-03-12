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
  orgName: string;

  @IsNotEmpty()
  @MaxLength(25)
  orgType: string;

  @IsNotEmpty()
  isFiscalYear: boolean;

  @IsNotEmpty()
  isCalFiscalYear: boolean;

  @IsNotEmpty()
  isCalLeaveFiscalYear: boolean;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  isDeleted: boolean;

  //   @ValidateNested()
  //   @Type(() => CreateOrgAddress)
  //   @IsNotEmptyObject()
  //   address: CreateOrgAddress;
}
