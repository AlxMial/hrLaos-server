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
    nullable: true,
    default: '',
    length: 100,
  })
  companyName: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  companyNameEn: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  companyType: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  businessType: number;

  @Column({
    nullable: false,
    default: null,
  })
  programStartDate: Date;

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
    default: null,
    type: 'bigint',
  })
  registerId: number;

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
