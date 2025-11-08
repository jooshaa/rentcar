import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { Rental } from "../../rentals/entities/rental.entity";

@Entity("branches")
export class Branch {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    address: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 25 })
    phone: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(()=> Car, (cars) => cars.branch)
    cars: Car[]

    @OneToMany(()=>Rental, (rental)=> rental.pickupBranch)
    rentalPickup: Rental[]

    @OneToMany(()=>Rental, (rental)=> rental.returnBranch)
    rentalReturn: Rental[]

}
