import { Injectable } from '@nestjs/common';
import { CreateOnlineRentModeDto } from './dto/create-online_rent_mode.dto';
import { UpdateOnlineRentModeDto } from './dto/update-online_rent_mode.dto';

@Injectable()
export class OnlineRentModeService {
  create(createOnlineRentModeDto: CreateOnlineRentModeDto) {
    return 'This action adds a new onlineRentMode';
  }

  findAll() {
    return `This action returns all onlineRentMode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onlineRentMode`;
  }

  update(id: number, updateOnlineRentModeDto: UpdateOnlineRentModeDto) {
    return `This action updates a #${id} onlineRentMode`;
  }

  remove(id: number) {
    return `This action removes a #${id} onlineRentMode`;
  }
}
