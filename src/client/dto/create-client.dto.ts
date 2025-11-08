import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsOptional,
    IsBoolean,
    Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name' })
    @IsString()
    @MaxLength(120)
    fullname: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address' })
    @IsEmail()
    @MaxLength(120)
    email: string;

    // writeOnly — будет виден в Swagger как поле для ввода, но не в response
    @ApiProperty({
        example: 'StrongP@ssw0rd',
        description: 'Plain text password (will be hashed on server)',
        writeOnly: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    password: string;

    @ApiProperty({ example: '+998901234567', description: 'Phone number' })
    @IsString()
    @MaxLength(20)
    // простая проверка формата: цифры, +, пробелы, дефисы (при необходимости можно заменить на IsPhoneNumber)
    @Matches(/^[+\d][\d\s-]{6,19}$/, { message: 'phone must be a valid phone-like string' })
    phone: string;

    @ApiProperty({ example: false, required: false, description: 'Is verified' })
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    is_verified?: boolean;
}