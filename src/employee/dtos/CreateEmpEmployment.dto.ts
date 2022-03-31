import { Exclude } from "class-transformer";

export class CreateEmpEmployment {
  empId: number;
  startWorkingDate: Date;
  departmentId: number;
  positionId: number;
  supervisorId: number;
  shiftId: number;
  empType: number;
  workingStatus: number;
  locationId: number;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;

  @Exclude()
  positionSave: string;
  @Exclude()
  departmentSave: string;
  @Exclude()
  supervisorSave: string;
  @Exclude()
  shiftSave: string;
}
