
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Matches, Max, Min } from 'class-validator';
import { State } from '../entities/car.entity';


export class CreateCarDto {
    @ApiProperty({ example: 1, description: 'ID филиала, к которому привязана машина' })
    @IsInt({ message: 'branch_id должен быть числом' })
    @IsPositive({ message: 'branch_id должен быть положительным числом' })
    branch_id: number;

    @ApiProperty({ example: 1, description: 'ID , к которому привязана машина' })
    @IsInt({ message: 'model_id должен быть числом' })
    @IsPositive({ message: 'model_id должен быть положительным числом' })
    model_id: number;

    @ApiProperty({ example: '01A123BC', description: 'Гос. номер автомобиля' })
    @IsString({ message: 'number_plate должно быть строкой' })
    @Length(5, 12, { message: 'Номер должен быть от 5 до 12 символов' })
    number_plate: string;

    @ApiProperty({ example: 2023, description: 'Год выпуска' })
    @IsInt({ message: 'year должен быть числом' })
    @Min(1990, { message: 'Год выпуска не может быть меньше 1990' })
    @Max(new Date().getFullYear(), { message: 'Год выпуска не может быть в будущем' })
    year: number;

    @ApiProperty({ example: 'Black', description: 'Цвет автомобиля' })
    @IsString({ message: 'color должно быть строкой' })
    @Length(2, 50, { message: 'Цвет должен быть от 2 до 50 символов' })
    color: string;

    @ApiProperty({ example: 150.5, description: 'Цена аренды за день (в $)' })
    @IsNumber({}, { message: 'per_day_price должно быть числом' })
    @IsPositive({ message: 'per_day_price должно быть положительным' })
    per_day_price: number;

    @ApiProperty({
        example: State.AVAILABLE,
        enum: State,
        description: 'Статус машины'
    })
    @IsEnum(State, { message: 'state должно быть одним из: booked, rented, available, completed' })
    @IsOptional()
    state?: State;

    @ApiProperty({ example: 'https://example.com/car.jpg', description: 'URL фотографии автомобиля' })
    @IsString({ message: 'photo должно быть строкой' })
    @Matches(/^https?:\/\/.*\.(jpg|jpeg|png|webp)$/i, { message: 'photo должно быть корректной ссылкой на изображение' })
    photo: string;

    @ApiProperty({ example: 3, description: 'Количество автомобилей этого типа' })
    @IsInt({ message: 'quantity должно быть числом' })
    @IsPositive({ message: 'quantity должно быть положительным' })
    quantity: number;

    @ApiProperty({
        example: '2025-01-10T10:00:00Z',
        description: 'Дата, когда автомобиль снова будет доступен (если занят)'
    })
    @IsOptional()
    next_available_at?: Date;
}
