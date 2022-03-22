import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbPosition' })
export class tbPosition {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  positionCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  positionName: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  positionNameEn: string;

  @Column({
    nullable: true,
    default: null,
    type: 'bigint',
  })
  mainPositionId: number;

  @Column({
    nullable: false,
    default: '',
    length: 500,
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
    length: 500,
  })
  jobDescription: string;

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
