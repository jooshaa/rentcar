
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChargeDto {
    @ApiProperty({ example: 1, description: 'ID аренды (rental_id)' })
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    rental_id: number;

    @ApiProperty({ example: 'Late return fee', description: 'Описание начисления' })
    @IsString()
    @MaxLength(255)
    description: string;

    @ApiProperty({ example: 25.50, description: 'Сумма (decimal)' })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;
}