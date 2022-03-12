import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbOrg' })
export class tbOrg {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  orgCode: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  orgName: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  orgNameEng: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  orgType: string;

  @Column({
    nullable: false,
    default: null,
  })
  businessType: number;

  @Column({
    nullable: false,
    default: null,
  })
  beginProgram: Date;

  @Column({
    nullable: false,
    default: null,
  })
  image: Buffer;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  taxNo: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  taxBranchNo: string;

  @Column({
    nullable: false,
    default: false,
  })
  isFiscalYear: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isCalLeaveFiscalYear: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  dateStartYear: Date;

  @Column({
    nullable: true,
    default: null,
  })
  monthStartYear: number;

  @Column({
    nullable: true,
    default: null,
  })
  yearCount: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  hourPerDay: string;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  dayPerMonth: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  companyId: number;

  @Column({
    nullable: true,
    default: null,
    type: 'bigint',
  })
  createdBy: number;

  @Column({
    nullable: true,
    default: null,
  })
  createdDate: Date;

  @Column({
    nullable: true,
    default: null,
    type: 'bigint',
  })
  modifiedBy: number;

  @Column({
    nullable: true,
    default: null,
  })
  modifiedDate: Date;

  @Column({
    nullable: false,
    default: false,
  })
  isDeleted: boolean;
}
