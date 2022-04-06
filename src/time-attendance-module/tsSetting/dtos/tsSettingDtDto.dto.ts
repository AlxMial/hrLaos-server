import { IsNotEmpty } from 'class-validator';

export class tsSettingDtDto {
  id: number;
  @IsNotEmpty()
  setTimeStampId: number;
  @IsNotEmpty()
  placeName: string;
  latitude: number;
  longitude: number;
  radius: number;
  description: string;
  @IsNotEmpty()
  isActive: boolean;

  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
