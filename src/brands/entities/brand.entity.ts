import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarModel } from "../../car-model/entities/car-model.entity";

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    country: string;

    @Column({ type: 'varchar', length: 5255, nullable: true })
    logo_url: string;

    @OneToMany(() => CarModel, (carModels) => carModels.brand, { onDelete: "CASCADE" })
    carModels: CarModel[];
}
