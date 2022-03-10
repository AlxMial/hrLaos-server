import { Exclude } from 'class-transformer';

export interface User {
  // id: number;
  // username: string;
  // password: string;
  // email: string;
  UserID: number;
  EmpID: number;
  UserName: string;
  Email: string;
  Password: string;
  Role: string;
  IsActivate: boolean;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;
}

export class SerializedUser {
  // id: number;
  // username: string;
  // email: string;
  UserID: number;
  EmpID: number;
  UserName: string;
  Email: string;
  Role: string;
  IsActivate: boolean;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;

  @Exclude()
  Password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
