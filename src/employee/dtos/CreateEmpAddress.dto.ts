import { IsNotEmpty } from 'class-validator';

export class CreateEmpAddress {
  empId: number;
  addressType: string;
  addressDetail: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
