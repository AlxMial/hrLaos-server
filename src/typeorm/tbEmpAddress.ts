import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEmpAddress' })
export class tbEmpAddress {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: null,
  })
  empId: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  addressType: string;

  @Column({
    nullable: true,
    default: '',
    length: 255,
  })
  addressDetail: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  district: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  amphur: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  province: string;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  postalCode: string;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  country: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  phone: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  email: string;

  @Column({
    nullable: true,
    default: null,
  })
  latitude: number;

  @Column({
    nullable: true,
    default: null,
  })
  longtitude: number;

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
