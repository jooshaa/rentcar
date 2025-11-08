import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateBrandDto {
    
    @ApiProperty({ example: 'Tesla' })
    @IsString()
    @IsNotEmpty({ message: 'name is required' })
    name: string;

    @ApiProperty({ example: 'USA' })
    @IsString()
    @IsNotEmpty({ message: 'country is required' })
    country: string;

    @ApiProperty({ example: 'https://tesla.com/logo.png', required: false })
    @IsString()
    @IsOptional()
    @IsUrl({}, { message: 'logo_url must be a valid URL' })
    logo_url?: string;
}
