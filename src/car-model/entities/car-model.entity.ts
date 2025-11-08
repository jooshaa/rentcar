import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Car } from '../../car/entities/car.entity';


export enum CarType {
    CROSSOVER = 'crossover',
    SEDAN = 'sedan',
}

@Entity('car_models')
export class CarModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Brand, (brand) => brand.carModels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'enum', enum: CarType })
    car_type: CarType;

    @Column({ type: 'int' })
    seats: number;

    @Column({ type: 'varchar', length: 50 })
    fuel_type: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(()=>Car, (cars)=> cars.carModel)
    cars:Car
    //teper prinimayet ili uje est 
}
