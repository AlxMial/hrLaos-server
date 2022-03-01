import { Exclude } from 'class-transformer';

export interface Register {
  RegisterID: string;
  CompanyName: string;
  TitleName: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  Password: string;
  IsActivate: boolean;
  ActivateDate: Date;
  RegisterDate: Date;
  NumberOfEmp: string;
}

export class SerializedRegister {
  RegisterID: string;
  CompanyName: string;
  TitleName: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  IsActivate: boolean;
  ActivateDate: Date;
  RegisterDate: Date;
  NumberOfEmp: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedRegister>) {
    Object.assign(this, partial);
  }
}
