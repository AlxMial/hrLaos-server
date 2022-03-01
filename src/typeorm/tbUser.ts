import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbUser' })
export class tbUser {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'UserID',
  })
  UserID: number;

  @Column({
    nullable: false,
    default: '',
  })
  EmpID: string;

  @Column({
    nullable: false,
    default: '',
    length: 255,
  })
  UserName: string;

  @Column({
    nullable: false,
    default: '',
    length: 255,
  })
  Email: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  Password: string;

  @Column({
    nullable: false,
    default: '',
    length: 25,
  })
  Role: string;

  @Column({
    nullable: false,
    default: false,
  })
  IsActivate: string;

  @Column({
    nullable: false,
    default: '',
    type: 'bigint',
  })
  CompanyID: number;

  @Column({
    nullable: true,
    default: '',
    type: 'bigint',
  })
  CreatedBy: number;

  @Column({
    nullable: true,
    default: new Date(),
  })
  CreatedDate: boolean;

  @Column({
    nullable: true,
    default: '',
    type: 'bigint',
  })
  ModifiedBy: number;

  @Column({
    nullable: true,
    default: new Date(),
  })
  ModifiedDate: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  IsDeleted: boolean;
}
