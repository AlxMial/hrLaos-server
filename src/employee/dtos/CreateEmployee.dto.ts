import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateEmpAddress } from './CreateEmpAddress.dto';

export class CreateEmployee {
  @IsNotEmpty()
  IsOver65: boolean;

  @IsNotEmpty()
  OrgID: number;

  @IsNotEmpty()
  CompanyID: number;

  @IsNotEmpty()
  IsDeleted: boolean;

  //   @ValidateNested()
  //   @Type(() => CreateEmpAddress)
  //   @IsNotEmptyObject()
  //   address: CreateEmpAddress;
}
