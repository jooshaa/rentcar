import { PartialType } from '@nestjs/swagger';
import { CreateCarUnavailablityDto } from './create-car_unavailablity.dto';

export class UpdateCarUnavailablityDto extends PartialType(CreateCarUnavailablityDto) {}
