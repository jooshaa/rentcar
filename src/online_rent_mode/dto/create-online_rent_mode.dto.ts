import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOnlineRentModeDto {
    @ApiProperty({ example: 5, description: 'Client ID (FK)' })
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    client_id: number;

    @ApiProperty({ example: 'AB1234567', description: 'Driver license number or link' })
    @IsString()
    @MaxLength(255)
    driver_license: string;

    @ApiProperty({ example: 'M12345678', description: 'Passport number or link' })
    @IsString()
    @MaxLength(255)
    passport: string;

    @ApiProperty({ example: false, required: false, description: 'Is verified (default false)' })
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    is_verified?: boolean;
}