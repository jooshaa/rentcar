
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Rental } from '../../rentals/entities/rental.entity';


@Entity('charges')
export class Charge {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Rental, (rental) => rental.charges, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rental_id' })
    rental: Rental;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}