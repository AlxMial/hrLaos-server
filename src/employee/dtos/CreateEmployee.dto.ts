import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateEmpAddress } from './CreateEmpAddress.dto';

export class CreateEmployee {
  @IsNotEmpty()
  isOver65: boolean;

  @IsNotEmpty()
  orgId: number;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  isDeleted: boolean;

  //   @ValidateNested()
  //   @Type(() => CreateEmpAddress)
  //   @IsNotEmptyObject()
  //   address: CreateEmpAddress;
}
