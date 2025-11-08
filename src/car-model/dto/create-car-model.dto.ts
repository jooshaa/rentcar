import { ApiProperty } from "@nestjs/swagger";
import { CarType } from "../entities/car-model.entity";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCarModelDto {
    @ApiProperty({ example: 1, description: 'ID бренда' })
    @IsInt({ message: 'brand_id must be an integer' })
    brand_id: number;

    @ApiProperty({ example: 'Model S' })
    @IsString()
    @IsNotEmpty({ message: 'name is required' })
    name: string;

    @ApiProperty({ example: CarType.CROSSOVER, enum: CarType })
    @IsEnum(CarType, { message: 'car_type must be either crossover or sedan' })
    car_type: CarType;

    @ApiProperty({ example: 5 })
    @IsInt({ message: 'seats must be an integer' })
    seats: number;

    @ApiProperty({ example: 'diesel' })
    @IsString()
    @IsNotEmpty({ message: 'fuel_type is required' })
    fuel_type: string;

    @ApiProperty({ example: '2025-01-01T12:00:00.000Z' })
    @IsOptional()
    @IsDate({ message: 'created_at must be a valid date' })
    created_at?: Date;
}
