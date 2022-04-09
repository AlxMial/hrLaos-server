import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbDepartment' })
export class tbDepartment {
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
  departmentCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  departmentName: string;

  @Column({
    default: '',
    length: 50,
  })
  departmentNameEn: string;

  @Column({
    nullable: true,
    default: null,
    type: 'bigint',
  })
  mainDepartmentId: number;

  @Column({
    default: '',
    length: 500,
  })
  description: string;

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
