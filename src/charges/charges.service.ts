import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Charge } from './entities/charge.entity';

@Injectable()
export class ChargesService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepo: Repository<Charge>
  ) { }
  async create(createChargeDto: CreateChargeDto) {
    const charges = this.chargeRepo.create({
      ...createChargeDto,
      rental: { id: createChargeDto.rental_id }
    })
    return await this.chargeRepo.save(charges)
  }

  async findAll() {
    return this.chargeRepo.find({})
  }

  async findOne(id: number) {
    const charges = await this.chargeRepo.findOne({
      where: { id },
    })
    if (!charges) {
      throw new NotFoundException("not found")
    }
    return charges
  }

  async update(id: number, updateChargeDto: UpdateChargeDto) {
    const charges = await this.findOne(id);
    Object.assign(charges, updateChargeDto)
    return await this.chargeRepo.save(charges)
  }

  async remove(id: number) {
    const charges = await this.findOne(id);
    await this.chargeRepo.remove(charges)
    return { message: "car-charges deleted" }
  }
}
