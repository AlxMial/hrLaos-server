import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEmpEmployment' })
export class tbEmpEmployment {
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
  empId: number;

  @Column({
    default: null,
  })
  startWorkingDate: Date;

  @Column({
    default: null,
    type: 'bigint',
  })
  departmentId: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  positionId: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  supervisorId: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  shiftId: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  empType: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  workingStatus: number;

  @Column({
    default: null,
    type: 'bigint',
  })
  locationId: number;

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
