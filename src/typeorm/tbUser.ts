import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbUser' })
export class tbUser {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: true,
    default: null,
    type: 'bigint',
  })
  empId: number;

  @Column({
    nullable: false,
    default: '',
    length: 255,
  })
  userName: string;

  @Column({
    nullable: false,
    default: '',
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  role: string;

  @Column({
    nullable: false,
    default: false,
  })
  isActivate: boolean;

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
