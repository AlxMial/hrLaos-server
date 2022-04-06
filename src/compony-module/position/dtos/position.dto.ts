import { IsNotEmpty } from 'class-validator';

export class positionDto {
  id: number;
  positionCode: string;
  positionName: string;
  positionNameEn: string;
  description: string;
  mainPositionId: number;
  jobDescription: string;

  @IsNotEmpty()
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
