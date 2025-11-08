import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepo: Repository<Rental>
  ) { }
  async create(createRentalDto: CreateRentalDto) {
    const Rental = this.rentalRepo.create({
      ...createRentalDto,
      client: { id: createRentalDto.client_id },
      pickupBranch: { id: createRentalDto.return_branch_id },
      returnBranch: { id: createRentalDto.return_branch_id }
    })
    return await this.rentalRepo.save(Rental)
  }

  async findAll() {
    return this.rentalRepo.find({
      relations: ["client", "pickupBranch", "returnBranch"],
      select: {
        client: { id: true, fullname: true, phone: true },
        pickupBranch: { name: true, address: true, phone: true },
        returnBranch: { name: true, address: true, phone: true }
      }
    })
  }

  async findOne(id: number) {
    const rental = await this.rentalRepo.findOne({
      relations: ["client", "pickupBranch", "returnBranch"],
      select: {
        client: { id: true, fullname: true, phone: true },
        pickupBranch: { name: true, address: true, phone: true },
        returnBranch: { name: true, address: true, phone: true }
      }
    })
    if (!rental) {
      throw new NotFoundException("not found")
    }
    return rental
  }


  async update(id: number, updateRentalDto: UpdateRentalDto) {
    const branch = await this.findOne(id);
    Object.assign(branch, updateRentalDto)
    return await this.rentalRepo.save(branch)
}

  async remove(id: number) {
    const branch = await this.findOne(id);
    await this.rentalRepo.remove(branch)
    return { message: "car-branch deleted" }
}
}
