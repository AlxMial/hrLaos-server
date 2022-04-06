import { Exclude } from 'class-transformer';

export interface Department {
  id: string;
  departmentCode: string;
  departmentName: string;
  departmentNameEn: string;
  mainDepartmentId: number;
  description: string;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}
