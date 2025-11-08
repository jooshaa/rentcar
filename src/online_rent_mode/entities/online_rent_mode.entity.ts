import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';


@Entity('online_rent_mode')
export class OnlineRentMode {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ type: 'varchar', length: 255 })
    driver_license: string;

    @Column({ type: 'varchar', length: 255 })
    passport: string;

    @Column({ type: 'boolean', default: false })
    is_verified: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}