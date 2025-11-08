import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch } from "../../branches/entities/branch.entity";
import { CarModel } from "../../car-model/entities/car-model.entity";
import { CarExpense } from "../../car-expenses/entities/car-expense.entity";
import { CarUnavailablity } from "../../car_unavailablities/entities/car_unavailablity.entity";

export enum State {
    BOOKED = "booked",
    RENTED = "rented",
    AVAILABLE = "available",
    COMPLETED = "completed"
}

@Entity("cars")
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Branch, (branch) => branch.cars)
    @JoinColumn({name: "branch_id"})
    branch:Branch

    @ManyToOne(() => CarModel, (carModel) => carModel.cars)
    @JoinColumn({ name: "model_id" })
    carModel: CarModel

    @Column({ type: 'varchar', length: 12, unique: true })
    number_plate: string;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'varchar', length: 50 })
    color: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 }) 
    per_day_price: number;

    @Column({ type: 'enum', enum: State, default: State.AVAILABLE }) 
    state: State;

    @Column({ type: 'varchar', length: 5000 })
    photo: string;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ type: 'timestamp', nullable: true })
    next_available_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(() => CarExpense, (carExpenses) => carExpenses.car)
    carExpenses : CarExpense[]
    
    @OneToMany(()=>CarUnavailablity, (carUnavail)=> carUnavail.car)
    carUnavail: CarUnavailablity

}
