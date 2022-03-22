import { IsNotEmpty } from 'class-validator';

export class positionDto {
  id: number;

  @IsNotEmpty()
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
