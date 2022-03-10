import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOrgAddress {
  @IsNotEmpty()
  OrgID: string;

  @IsNotEmpty()
  CompanyID: number;

  @IsNotEmpty()
  IsDeleted: boolean;
}
