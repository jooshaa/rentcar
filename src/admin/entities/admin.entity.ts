import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

export enum AdminRole {
    MANAGER = 'admin',
    ADMIN = 'superadmin',
}

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    user_name: string;

    @Column({ type: 'varchar', length: 120 })
    full_name: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({
        type: 'enum',
        enum: AdminRole,
        default: AdminRole.MANAGER,
    })
    role: AdminRole;

    @Column({ type: 'varchar', length: 520, default:null})
    refresh_token:string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}