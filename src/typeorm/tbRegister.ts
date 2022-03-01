import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbRegister' })
export class tbRegister {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'RegisterID',
  })
  RegisterID: number;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  CompanyName: string;

  @Column({
    type: 'bigint',
    nullable: false,
    default: null,
  })
  TitleName: number;

  @Column({
    nullable: true,
    default: '',
    length: 100,
  })
  FirstName: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  LastName: string;

  @Column({
    nullable: false,
    default: '',
    length: 50,
  })
  Phone: string;

  @Column({
    nullable: false,
    default: '',
    length: 100,
  })
  Email: string;

  @Column({
    nullable: false,
    default: '',
    length: 1000,
  })
  Password: string;

  @Column({
    nullable: false,
    default: false,
  })
  IsActivate: boolean;

  @Column({
    nullable: true,
    default: new Date(),
  })
  ActivateDate: Date;

  @Column({
    nullable: true,
    default: new Date(),
  })
  RegisterDate: Date;

  @Column({
    nullable: true,
    default: '',
    length: 50,
  })
  NumberOfEmp: string;
}
