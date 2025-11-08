import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Matches,
    IsEnum,
    IsOptional,
} from 'class-validator';
import { AdminRole } from '../entities/admin.entity';

export class CreateAdminDto {
    @ApiProperty({ example: 'john_manager', description: 'Unique username' })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9_.-]+$/, { message: 'user_name may contain letters, numbers, _ . -' })
    user_name: string;

    @ApiProperty({ example: 'John Doe', description: 'Full name' })
    @IsString()
    @MaxLength(120)
    full_name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email' })
    @IsEmail()
    @MaxLength(120)
    email: string;

    @ApiProperty({
        example: 'StrongP@ssw0rd',
        description: 'Plain password (will be hashed on server)',
        writeOnly: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    password: string;

    @ApiProperty({ example: AdminRole.MANAGER, enum: AdminRole, required: false })
    @IsOptional()
    @IsEnum(AdminRole)
    role?: AdminRole;
}