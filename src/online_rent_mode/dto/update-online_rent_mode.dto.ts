import { PartialType } from '@nestjs/swagger';
import { CreateOnlineRentModeDto } from './create-online_rent_mode.dto';

export class UpdateOnlineRentModeDto extends PartialType(CreateOnlineRentModeDto) {}
