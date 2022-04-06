import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbSetTimeStampDt' })
export class tbSetTimeStampDt {
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
  setTimeStampId: number;

  @Column({
    nullable: false,
    default: '',
  })
  placeName: string;

  @Column({
    nullable: true,
    default: null,
  })
  latitude: number;

  @Column({
    nullable: true,
    default: null,
  })
  longitude: number;

  @Column({
    nullable: true,
    default: null,
  })
  radius: number;

  @Column({
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    nullable: false,
    default: false,
  })
  isActive: boolean;

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
