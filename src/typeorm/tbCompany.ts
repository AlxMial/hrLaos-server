import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbCompany' })
export class tbCompany {
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
  companyCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  companyName: string;

  @Column({
    default: '',
    length: 100,
  })
  companyNameEn: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  companyType: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  businessType: number;

  @Column({
    default: null,
  })
  programStartDate: Date;

  @Column({
    default: null,
    type: 'varbinary',
  })
  image: string;

  @Column({
    default: '',
    length: 25,
  })
  taxNo: string;

  @Column({
    default: '',
    length: 25,
  })
  taxBranchNo: string;

  @Column({
    default: null,
    type: 'bigint',
  })
  registerId: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  createdBy: number;

  @Column({
    default: null,
  })
  createdDate: Date;

  @Column({
    default: null,
    type: 'bigint',
  })
  modifiedBy: number;

  @Column({
    default: null,
  })
  modifiedDate: Date;

  @Column({
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isActive: boolean;
}
