import { IsNotEmpty } from 'class-validator';

export class shiftDetail {
  id: number;
  shiftId: number;
  @IsNotEmpty()
  timesStamp: number;
  @IsNotEmpty()
  in1: number;
  @IsNotEmpty()
  out1: number;
  breakStart: number;
  breakEnd: number;
  in2: number;
  out2: number;
  breakHour: number;
  workHour: number;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
