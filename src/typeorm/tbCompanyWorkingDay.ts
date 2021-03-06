import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbCompanyWorkingDay' })
export class tbCompanyWorkingDay {
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
  companyId: number;

  @Column({
    nullable: true,
    default: null,
  })
  startTime: Date;

  @Column({
    nullable: true,
    default: null,
  })
  endTime: Date;

  @Column({
    nullable: false,
    default: null,
  })
  isMonday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isTueday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isWednesday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isThursday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isFriday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isSaturday: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isSunday: boolean;

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
