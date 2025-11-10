import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    BeforeInsert,
} from 'typeorm';
import { Rental } from '../../rentals/entities/rental.entity';
import { OnlineRentMode } from '../../online_rent_mode/entities/online_rent_mode.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 120 })
    fullname: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    phone: string;

    @Column({ type: 'boolean', default: false })
    is_verified: boolean;

    @Column({ type: 'varchar', length: 520, default: null})
    refresh_token: string

    @Column({
        type: 'uuid',
        nullable: true,
    })
    activation_link: string | null;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToOne(()=>Rental, (rental)=> rental.client)
    rental: Rental

    @OneToOne(() => OnlineRentMode, (onlineRent) => onlineRent.client)
    onlineRent: OnlineRentMode

    @BeforeInsert()
    generateActivationLink() {
        if (!this.activation_link) {
            this.activation_link = uuidv4();
        }
    }
}