import { IsNotEmpty } from 'class-validator';

export class locationDto {
  id: number;
  locationCode: string;
  locationName: string;
  locationNameEn: string;
  latitude: number;
  longitude: number;
  radius: number;
  @IsNotEmpty()
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
