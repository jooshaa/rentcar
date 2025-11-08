import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarUnavailablityDto } from './dto/create-car_unavailablity.dto';
import { UpdateCarUnavailablityDto } from './dto/update-car_unavailablity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarUnavailablity } from './entities/car_unavailablity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarUnavailablitiesService {
  constructor(
    @InjectRepository(CarUnavailablity)
    private readonly carUnavail: Repository<CarUnavailablity>
  ) { }

  async create(createCarUnavailablityDto: CreateCarUnavailablityDto) {
    const car = this.carUnavail.create({
      ...createCarUnavailablityDto,
      car: { id: createCarUnavailablityDto.car_id }
    })
    return await this.carUnavail.save(car)
  }

  async findAll() {
    return this.carUnavail.find({
      relations: ["car"],
      select: {
        car: {
          id: true,
          number_plate: true
        }
      }
    })
  }

  async findOne(id: number) {
    const carUnavail = await this.carUnavail.findOne({
      where: { id },
      relations: ["car"],
      select: {
        car: {
          id: true,
          number_plate: true
        }
      }
    })
    if (!carUnavail) {
      throw new NotFoundException("not found")
    }
    return carUnavail
  }

  async update(id: number, updateCarUnavailablityDto: UpdateCarUnavailablityDto) {
    const carUnavail = await this.findOne(id);
    Object.assign(carUnavail, updateCarUnavailablityDto)
    return await this.carUnavail.save(carUnavail)
  }

  async remove(id: number) {
    const carUnavail = await this.findOne(id);
    await this.carUnavail.remove(carUnavail)
    return { message: "car-carUnavail deleted" }
  }
}
