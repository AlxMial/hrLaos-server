import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbOrgAddress' })
export class tbOrgAddress {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'OrgID',
  })
  OrgAddressID: number;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  OrgID: number;

  @Column({
    nullable: false,
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
    nullable: false,
    default: '',
    length: 100,
  })
  Amphur: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  Province: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  PostalCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  Country: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  Phone: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  Email: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  Fax: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  Website: string;

  @Column({
    nullable: false,
    default: null,
  })
  Latitude: number;

  @Column({
    nullable: false,
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
