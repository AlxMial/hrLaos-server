import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbOrgAddress' })
export class tbOrgAddress {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  orgID: number;

  @Column({
    nullable: false,
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
    nullable: false,
    default: '',
    length: 100,
  })
  amphur: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  province: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  postalCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  country: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  phone: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  fax: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  website: string;

  @Column({
    nullable: false,
    default: null,
  })
  latitude: number;

  @Column({
    nullable: false,
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
