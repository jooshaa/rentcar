import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length
} from 'class-validator';

export class CreateCarExpenseDto {
    @ApiProperty({ example: 1, description: 'ID автомобиля, к которому относится расход' })
    @IsInt({ message: 'car_id должно быть числом' })
    @IsPositive({ message: 'car_id должно быть положительным числом' })
    car_id: number;

    @ApiProperty({ example: 'Замена масла', description: 'Тип или категория расхода' })
    @IsString({ message: 'expense_type должно быть строкой' })
    @Length(3, 500, { message: 'Тип расхода должен содержать от 3 до 500 символов' })
    expense_type: string;

    @ApiProperty({ example: 250.75, description: 'Стоимость расхода' })
    @IsNumber({}, { message: 'price должно быть числом' })
    @IsPositive({ message: 'price должно быть положительным числом' })
    price: number;

    @ApiProperty({ example: 'Плановая замена масла в двигателе', description: 'Описание расхода' })
    @IsString({ message: 'description должно быть строкой' })
    @Length(5, 1000, { message: 'Описание должно содержать от 5 до 1000 символов' })
    description: string;

    @ApiProperty({ example: '2025-11-06T10:00:00Z', description: 'Дата расхода (по умолчанию — текущее время)' })
    @IsOptional()
    expense_date?: Date;
}
