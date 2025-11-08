import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car-model.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepo: Repository<CarModel>
){}
  async create(createCarModelDto: CreateCarModelDto): Promise<CarModel> {
    const carModelBody = this.carModelRepo.create({
      ...createCarModelDto,
      brand: {id: createCarModelDto.brand_id}
    })
    return await  this.carModelRepo.save(carModelBody)
  }

  async findAll():Promise<CarModel[]> {
    return await this.carModelRepo.find({select: ["name"],relations: ["brand"]})
  }

  async findOne(id: number) {
    const model = await this.carModelRepo.findOne({
      where: {id},
      relations: ["brand"]
    })
    if(!model){
      throw new NotFoundException("not found")
    }
    return model
  }

  async update(id: number, updateCarModelDto: UpdateCarModelDto) {
    const model = await this.findOne(id);
    Object.assign(model, updateCarModelDto)
    return await this.carModelRepo.save(model)
  }

  async remove(id: number) {
    const model = await this.findOne(id);
    await this.carModelRepo.remove(model)
    return{message: "car-model deleted"}
  }
}
