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
  hourPerDay: number;

  @Column({
    nullable: false,
    default: null,
  })
  dayPerMonth: number;

  @Column({
    nullable: false,
    default: null,
  })
  isMon: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isTue: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isWed: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isThu: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isFri: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isSat: boolean;

  @Column({
    nullable: false,
    default: null,
  })
  isSun: boolean;

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
