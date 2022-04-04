import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbEnum' })
export class tbEnum {
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
    name: string;

    @Column({
        nullable: false,
        default: '',
        length: 50,
    })
    caption: string;

    @Column({
        nullable: false,
        default: '',
        length: 50,
    })
    captionEn: string;

    @Column({
        nullable: false,
        default: '',
        length: 50,
    })
    type: string;

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
