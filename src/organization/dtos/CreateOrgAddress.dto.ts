import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOrgAddress {
  @IsNotEmpty()
  orgId: string;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  isDeleted: boolean;
}
