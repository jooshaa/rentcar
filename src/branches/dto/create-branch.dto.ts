
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CreateBranchDto {

    @ApiProperty({ example: 'Downtown Branch', description: 'Название филиала' })
    @IsString({ message: 'Name должно быть строкой' })
    @Length(2, 100, { message: 'Name должно быть от 2 до 100 символов' })
    name: string;

    @ApiProperty({ example: '123 Main St, New York', description: 'Адрес филиала' })
    @IsString({ message: 'Address должно быть строкой' })
    @Length(5, 500, { message: 'Address должно быть от 5 до 500 символов' })
    address: string;

    @ApiProperty({ example: 'New York', description: 'Город филиала' })
    @IsString({ message: 'City должно быть строкой' })
    @Length(2, 100, { message: 'City должно быть от 2 до 100 символов' })
    city: string;

    @ApiProperty({ example: '+998337367474', description: 'Телефон филиала' })
    @Matches(/^\+?[0-9]{7,25}$/, {
        message: 'Телефон должен содержать только цифры и может начинаться с + (от 7 до 25 символов)',
    })
    phone: string;
}
