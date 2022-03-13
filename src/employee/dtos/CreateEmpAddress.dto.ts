import { IsNotEmpty } from 'class-validator';

export class CreateEmpAddress {
  @IsNotEmpty()
  empId: number;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  isDeleted: boolean;

  userId: number;
}
