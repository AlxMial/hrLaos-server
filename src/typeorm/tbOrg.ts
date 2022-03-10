import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbOrg' })
export class tbOrg {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'OrgID',
  })
  OrgID: number;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  OrgCode: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  OrgName: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  OrgNameEng: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  OrgType: string;

  @Column({
    nullable: false,
    default: null,
  })
  BusinessType: number;

  @Column({
    nullable: false,
    default: null,
  })
  BeginProgram: Date;

  @Column({
    nullable: false,
    default: null,
  })
  Image: Buffer;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  TaxNo: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
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
    default: null,
  })
  DateStartYear: Date;

  @Column({
    nullable: true,
    default: null,
  })
  MonthStartYear: number;

  @Column({
    nullable: true,
    default: null,
  })
  YearCount: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  HourPerDay: string;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  DayPerMonth: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  CompanyID: number;

  @Column({
    nullable: true,
    default: null,
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
    default: null,
    type: 'bigint',
  })
  ModifiedBy: number;

  @Column({
    nullable: true,
    default: null,
  })
  ModifiedDate: Date;

  @Column({
    nullable: false,
    default: false,
  })
  IsDeleted: boolean;
}
