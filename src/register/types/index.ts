import { Exclude } from 'class-transformer';

export interface Register {
  id: string;
  companyName: string;
  titleName: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isActivate: boolean;
  activateDate: Date;
  registerDate: Date;
  numberOfEmp: number;
}

export class SerializedRegister {
  id: string;
  companyName: string;
  titleName: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isActivate: boolean;
  activateDate: Date;
  registerDate: Date;
  numberOfEmp: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedRegister>) {
    Object.assign(this, partial);
  }
}
