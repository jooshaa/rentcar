import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";

@Entity("car_unavailabilities")
export class CarUnavailablity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Car, (car) => car.carUnavail)
    @JoinColumn({ name: "car_id" })
    car: Car

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    start_ts: Date;

    @Column({type: `timestamp`})
    end_ts: Date

}
