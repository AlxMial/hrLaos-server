import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbShiftDetail' })
export class tbShiftDetail {
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
  shiftId: number;

  @Column({
    nullable: false,
    default: null,
  })
  timesStamp: number;

  @Column({
    nullable: false,
    default: null,
  })
  in1: number;

  @Column({
    nullable: false,
    default: null,
  })
  out1: number;

  @Column({
    nullable: false,
    default: null,
  })
  breakStart: number;

  @Column({
    nullable: false,
    default: null,
  })
  breakEnd: number;

  @Column({
    nullable: false,
    default: null,
  })
  in2: number;

  @Column({
    nullable: false,
    default: null,
  })
  out2: number;

  @Column({
    nullable: false,
    default: null,
  })
  breakHour: number;

  @Column({
    nullable: false,
    default: null,
  })
  workHour: number;

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
