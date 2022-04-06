import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { shiftDetailDto } from './shiftDetailDto.dto';

export class shiftDto {
  id: number;
  @IsNotEmpty()
  shiftCode: string;
  @IsNotEmpty()
  shiftName: string;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  @IsNotEmpty()
  isDeleted: boolean;
  userId: number;

  @ValidateNested()
  @Type(() => shiftDetailDto)
  // @IsNotEmptyObject()
  shiftDetail: shiftDetailDto[];
}
