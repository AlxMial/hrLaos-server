import { IsNotEmpty } from 'class-validator';

export class departmentDto {
  id: number;
  departmentCode: string;
  departmentName: string;
  departmentNameEn: string;
  mainDepartmentId: number;
  description: string;
  @IsNotEmpty()
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
