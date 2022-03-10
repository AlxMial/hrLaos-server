import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbOrganization' })
export class tbOrganization {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'OrgID',
  })
  OrgID: number;

  @Column({
    nullable: false,
    default: '',
  })
  OrgCode: string;

  @Column({
    nullable: true,
    default: '',
  })
  OrgName: string;

  @Column({
    nullable: false,
    default: '',
  })
  OrgNameEng: string;

  @Column({
    nullable: false,
    default: '',
  })
  OrgType: string;

  @Column({
    nullable: false,
    default: '',
  })
  BusinessType: string;

  @Column({
    nullable: false,
    default: '',
  })
  BeginProgram: string;

  @Column({
    nullable: false,
    default: null,
  })
  Image: Buffer;

  @Column({
    nullable: false,
    default: '',
  })
  TaxNo: string;

  @Column({
    nullable: false,
    default: '',
  })
  TaxBranchNo: string;

  @Column({
    nullable: false,
    default: false,
  })
  IsFiscalYear: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  IsCalLeaveFiscalYear: boolean;

  @Column({
    nullable: true,
    default: '',
  })
  DateStartYear: string;

  @Column({
    nullable: true,
    default: '',
  })
  MonthStartYear: string;

  @Column({
    nullable: true,
    default: '',
  })
  YearCount: string;

  @Column({
    nullable: true,
    default: '',
  })
  HourPerDay: string;

  @Column({
    nullable: true,
    default: '',
  })
  DayPerMonth: string;

  @Column({
    nullable: false,
    default: '',
    type: 'bigint',
  })
  CompanyID: number;

  @Column({
    nullable: true,
    default: '',
    type: 'bigint',
  })
  CreatedBy: number;

  @Column({
    nullable: true,
    default: null,
  })
  CreatedDate: Date;

  @Column({
    nullable: true,
    default: '',
    type: 'bigint',
  })
  ModifiedBy: number;

  @Column({
    nullable: true,
    default: null,
  })
  ModifiedDate: Date;

  @Column({
    nullable: true,
    default: false,
  })
  IsDeleted: boolean;
}
