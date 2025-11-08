import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsString, Length, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentStatus, PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {

    @ApiProperty({ example: 1, description: 'Rental ID (FK)' })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    rental_id: number;

    @ApiProperty({ example: 120.5, description: 'Сумма платежа' })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ example: 'USD', description: 'Валюта (ISO код)' })
    @IsString()
    @Length(3, 10)
    currency: string;

    @ApiProperty({ example: PaymentStatus.PENDING, enum: PaymentStatus, description: 'Статус платежа' })
    @IsOptional()
    @IsEnum(PaymentStatus)
    status?: PaymentStatus;

    @ApiProperty({ example: PaymentMethod.CARD, enum: PaymentMethod, description: 'Метод оплаты' })
    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @ApiProperty({
        example: '2025-03-01T12:00:00Z',
        required: false,
        description: 'Время оплаты (ISO 8601). Если не указан — будет установлен сервером'
    })
    @IsOptional()
    @IsDateString()
    paid_at?: string;
}