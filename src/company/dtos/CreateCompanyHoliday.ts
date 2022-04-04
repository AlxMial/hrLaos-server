import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CreateCompanyHoliday' })
export class CreateCompanyHoliday {
  date: Date;
  name: string;
  nameEn: string;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
  userId: number;
}
