import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsDateString, IsNumber, Min, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RentalStatus } from '../entities/rental.entity';


export class CreateRentalDto {
    @ApiProperty({ example: 5, description: 'ID клиента' })
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    client_id: number;

    @ApiProperty({ example: 2, description: 'ID пункта выдачи (pickup branch)' })
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    pickup_branch_id: number;

    @ApiProperty({ example: 3, description: 'ID пункта возврата (может быть null до возврата)', required: false })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    return_branch_id?: number;

    @ApiProperty({ example: '2025-04-10T10:00:00Z', description: 'Время выдачи (ISO 8601)' })
    @IsDateString()
    pickup_datetime: string;

    @ApiProperty({ example: '2025-04-12T19:00:00Z', description: 'Время возврата (ISO 8601)' })
    @IsDateString()
    return_datetime: string;

    @ApiProperty({ example: 320.50, description: 'Общая цена (decimal)' })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    total_price: number;

    @ApiProperty({ example: RentalStatus.BOOKED, enum: RentalStatus, required: false })
    @IsOptional()
    @IsEnum(RentalStatus)
    status?: RentalStatus;
}