import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbLocation' })
export class tbLocation {
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
  locationCode: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  locationName: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  locationNameEn: string;

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
