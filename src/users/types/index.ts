import { Exclude } from 'class-transformer';

export interface User {
  // id: number;
  // username: string;
  // password: string;
  // email: string;
  id: number;
  empId: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  isActivate: boolean;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}

export class SerializedUser {
  // id: number;
  // username: string;
  // email: string;
  id: number;
  empId: number;
  userName: string;
  email: string;
  role: string;
  isActivate: boolean;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;

  @Exclude()
  Password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
