import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rental } from '../../rentals/entities/rental.entity';

export enum PaymentStatus {
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    PENDING = 'pending',
}

export enum PaymentMethod {
    CARD = 'card',
    CASH = 'cash',
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Rental, (rental) => rental.payments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rental_id' })
    rental: Rental;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    currency: string;
    

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        nullable: true
    })
    method: PaymentMethod;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    paid_at: Date;
}