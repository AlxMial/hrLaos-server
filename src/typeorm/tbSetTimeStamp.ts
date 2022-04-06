import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbSetTimeStamp' })
export class tbSetTimeStamp {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: false,
  })
  isAllowTimeStamp: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isAllowInside: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isCompany: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  companyRadius: number;

  @Column({
    nullable: false,
    default: false,
  })
  isAllCompany: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  allCompanyRadius: number;


  @Column({
    nullable: false,
    default: false,
  })
  isAllowOutside: boolean;


  @Column({
    nullable: false,
    default: false,
  })
  isAnywhere: boolean;


  @Column({
    nullable: false,
    default: false,
  })
  isSetPlace: boolean;


  @Column({
    nullable: false,
    default: false,
  })
  isAllowCurrentAddress: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isPhoto: boolean;

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
