import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEmployee' })
export class tbEmployee {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'EmpID',
  })
  EmpID: number;

  @Column({
    nullable: true,
    default: null,
  })
  Image: Buffer;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  EmpCode: string;

  @Column({
    nullable: true,
    default: null,
  })
  Title: number;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  FirstName: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  LastName: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  NickName: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  FirstNameEng: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  LastNameEng: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  NickNameEng: string;

  @Column({
    nullable: true,
    default: null,
  })
  Gender: number;

  @Column({
    nullable: true,
    default: null,
  })
  BirthDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  Religion: number;

  @Column({
    nullable: true,
    default: null,
  })
  Nationality: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  IdentificationNo: string;

  @Column({
    nullable: true,
    default: null,
  })
  IdentityExpire: Date;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  PassportNo: string;

  @Column({
    nullable: true,
    default: null,
  })
  PassportExpire: Date;

  @Column({
    nullable: true,
    default: null,
  })
  MaritalStatus: number;

  @Column({
    nullable: false,
    default: null,
  })
  IsOver65: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  MaritalDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  MilitaryStatus: number;

  @Column({
    nullable: true,
    default: '',
    length: 255,
  })
  ExemptReason: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  OrgID: number;

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
