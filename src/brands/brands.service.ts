import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>
  ) { }
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.create(createBrandDto)
    return await this.brandRepo.save(brand)
  }

  async findAll() {
    return await this.brandRepo.find({})
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({ where: { id } })
    if (!brand) {
      throw new NotFoundException("not found")
    }
    return brand
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id)
    Object.assign(brand, updateBrandDto)
    return await this.brandRepo.save(brand)
  }

  async remove(id: number) {
    const brand = await this.findOne(id)
    await this.brandRepo.remove(brand)
    return { message: "brand deleted" }
  }
}
