import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEmpAddress' })
export class tbEmpAddress {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'EmpAddressID',
  })
  EmpAddressID: number;

  @Column({
    nullable: false,
    default: null,
  })
  EmpID: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  AddressType: string;

  @Column({
    nullable: true,
    default: '',
    length: 255,
  })
  AddressDetail: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  District: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  Amphur: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  Province: string;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  PostalCode: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  Country: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  Phone: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  Email: string;

  @Column({
    nullable: true,
    default: null,
  })
  Latitude: number;

  @Column({
    nullable: true,
    default: null,
  })
  Longtitude: number;

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
