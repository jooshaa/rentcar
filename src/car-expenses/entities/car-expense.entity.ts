import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "typeorm/browser";
import { Car } from "../../car/entities/car.entity";

@Entity('car_expenses')
export class CarExpense {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Car, (car)=> car.carExpenses)
    @JoinColumn({name: "car_id"})
    car: Car

    @Column({ type: 'varchar', length: 500 })
    expense_type: string;

    @Column({ type: 'numeric'})
    price: number;

    @Column({ type: 'varchar', length: 1000 })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    expense_date: Date;
    

}
