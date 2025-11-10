import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { Branch } from '../../branches/entities/branch.entity';
import { Client } from '../../client/entities/client.entity';
import { Charge } from '../../charges/entities/charge.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Car } from '../../car/entities/car.entity';

export enum RentalStatus {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    RENTING = 'renting'
}

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(()=> Charge, (charges)=> charges.rental)
    charges: Charge[]

    @OneToMany(() => Payment, (payments) => payments.rental)
    payments: Payment[]

    @OneToOne(()=> Client, (client)=> client.rental)
    @JoinColumn({name: "client_id"})
    client: Client

    @ManyToOne(()=>Car, (car)=>car.rental)
    @JoinColumn({name: "car_id"})
    cars: Car

    @ManyToOne(()=> Branch, (branch)=> branch.rentalPickup)
    @JoinColumn({name: "pickup_branch_id"})
    pickupBranch: Branch

    @ManyToOne(() => Branch, (branch) => branch.rentalReturn)
    @JoinColumn({ name: "return_branch_id" })
    returnBranch: Branch

    @Column({ type: 'timestamptz' })
    pickup_datetime: Date;

    @Column({ type: 'timestamptz' })
    return_datetime: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;

    @Column({
        type: 'enum',
        enum: RentalStatus,
        default: RentalStatus.PENDING,
    })
    status: RentalStatus;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}