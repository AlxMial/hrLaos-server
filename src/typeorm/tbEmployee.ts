import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEmployee' })
export class tbEmployee {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: true,
    default: null,
  })
  image: Buffer;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  empCode: string;

  @Column({
    nullable: true,
    default: null,
  })
  title: number;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  firstName: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  lastName: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  nickName: string;

  @Column({
    nullable: true,
    default: null,
  })
  titleEn: number;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  firstNameEn: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  lastNameEn: string;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  nickNameEn: string;

  @Column({
    nullable: true,
    default: null,
  })
  gender: number;

  @Column({
    nullable: true,
    default: null,
  })
  birthDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  religion: number;

  @Column({
    nullable: true,
    default: null,
  })
  nationality: number;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  identificationNo: string;

  @Column({
    nullable: true,
    default: null,
  })
  identityExpire: Date;

  @Column({
    nullable: true,
    default: '',
    length: 25,
  })
  passportNo: string;

  @Column({
    nullable: true,
    default: null,
  })
  passportExpire: Date;

  @Column({
    nullable: true,
    default: null,
  })
  maritalStatus: number;

  @Column({
    nullable: false,
    default: null,
  })
  isOver65: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  maritalDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  militaryStatus: number;

  @Column({
    nullable: true,
    default: '',
    length: 255,
  })
  exemptReason: string;

  @Column({
    nullable: false,
    default: null,
    type: 'bigint',
  })
  orgId: number;

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
