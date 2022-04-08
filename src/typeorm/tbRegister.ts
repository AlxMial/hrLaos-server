import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbRegister' })
export class tbRegister {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  companyName: string;

  @Column({
    type: 'bigint',
    nullable: false,
    default: null,
  })
  titleName: number;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  firstName: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  lastName: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  phone: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
    length: 1000,
  })
  password: string;

  @Column({
    nullable: false,
    default: false,
  })
  isActivate: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  activateDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  registerDate: Date;

  @Column({
    nullable: true,
    default: null,
  })
  numberOfEmp: number;

  @Exclude()
  @Column({
    default: '',
    length: 1000,
  })
  clientUrl: string;
}
