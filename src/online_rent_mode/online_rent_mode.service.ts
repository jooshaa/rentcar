import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOnlineRentModeDto } from './dto/create-online_rent_mode.dto';
import { UpdateOnlineRentModeDto } from './dto/update-online_rent_mode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OnlineRentMode } from './entities/online_rent_mode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OnlineRentModeService {
  constructor(
    @InjectRepository(OnlineRentMode)
    private readonly onlineRentRepo: Repository<OnlineRentMode>
  ) { }

  async create(createOnlineRentModeDto: CreateOnlineRentModeDto) {
    const onlineRent = await this.onlineRentRepo.create(createOnlineRentModeDto)
    return await this.onlineRentRepo.save(onlineRent)
  }

  async findAll() {
    return await this.onlineRentRepo.find({})
  }

  async findOne(id: number) {
    const onlineRent = await this.onlineRentRepo.findOne({ where: { id } })
    if (!onlineRent) {
      throw new NotFoundException("not found")
    }
    return onlineRent
  }

  async update(id: number, updateOnlineRentModeDto: UpdateOnlineRentModeDto) {
    const onlineRent = await this.findOne(id)
    Object.assign(onlineRent, updateOnlineRentModeDto)
    return await this.onlineRentRepo.save(onlineRent)
  }

  async remove(id: number) {
    const admin = await this.findOne(id)
    await this.onlineRentRepo.remove(admin)
    return { message: "onlineRentData deleted" }
  }
}
