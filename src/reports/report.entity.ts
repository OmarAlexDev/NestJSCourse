import {ManyToOne,Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './../users/user.entity';

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    price: number;

    @Column({default: false})
    approved: boolean;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage:number;

    @ManyToOne(()=>User, (user)=>user.reports)
    user: User
}