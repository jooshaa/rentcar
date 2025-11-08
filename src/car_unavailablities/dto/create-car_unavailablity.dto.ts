import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsDateString
} from 'class-validator';

export class CreateCarUnavailablityDto {
    @ApiProperty({ example: 5, description: 'ID автомобиля, который недоступен' })
    @IsInt({ message: 'car_id должно быть числом' })
    @IsPositive({ message: 'car_id должно быть положительным числом' })
    car_id: number;

    @ApiProperty({
        example: '2025-11-06T10:00:00.000Z',
        description: 'Дата и время начала недоступности (по умолчанию — текущее время)'
    })
    @IsOptional()
    @IsDateString({}, { message: 'start_ts должно быть корректной датой в формате ISO (YYYY-MM-DDTHH:mm:ssZ)' })
    start_ts?: Date;

    @ApiProperty({
        example: '2025-11-08T18:00:00.000Z',
        description: 'Дата и время окончания недоступности автомобиля'
    })
    @IsNotEmpty({ message: 'end_ts обязательно для указания' })
    @IsDateString({}, { message: 'end_ts должно быть корректной датой в формате ISO (YYYY-MM-DDTHH:mm:ssZ)' })
    end_ts: Date;
}
