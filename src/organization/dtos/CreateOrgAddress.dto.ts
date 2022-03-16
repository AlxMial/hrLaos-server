import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOrgAddress {
  id: number;

  @IsNotEmpty()
  orgId: string;

  addressDetail: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  fax: string;
  website: string;
  latitude: number;
  longitude: number;

  @IsNotEmpty()
  companyId: number;

  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;

  @IsNotEmpty()
  isDeleted: boolean;

  userId: number;
}
