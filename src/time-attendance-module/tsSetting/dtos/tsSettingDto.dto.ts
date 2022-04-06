import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { tsSettingDtDto } from './tsSettingDtDto.dto';

export class tsSettingDto {
  id: number;
  @IsNotEmpty()
  isAllowTimeStamp: boolean;
  @IsNotEmpty()
  isAllowInside: boolean;
  @IsNotEmpty()
  isCompany: boolean;
  companyRadius: number;
  @IsNotEmpty()
  isAllCompany: boolean;
  allCompanyRadius: number;
  @IsNotEmpty()
  isAllowOutside: boolean;
  @IsNotEmpty()
  isAnywhere: boolean;
  @IsNotEmpty()
  isSetPlace: boolean;
  @IsNotEmpty()
  isAllowCurrentAddress: boolean;
  @IsNotEmpty()
  isPhoto: boolean;

  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  @IsNotEmpty()
  isDeleted: boolean;
  userId: number;

  @ValidateNested()
  @Type(() => tsSettingDtDto)
  // @IsNotEmptyObject()
  tsSettingDtDto: tsSettingDtDto[];
}
