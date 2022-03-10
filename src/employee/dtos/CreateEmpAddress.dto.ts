import { IsNotEmpty } from 'class-validator';

export class CreateEmpAddress {
  @IsNotEmpty()
  EmpID: number;

  @IsNotEmpty()
  CompanyID: number;

  @IsNotEmpty()
  IsDeleted: boolean;
}
