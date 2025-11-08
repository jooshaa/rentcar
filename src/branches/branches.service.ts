import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>
  ) { }
  async create(createBranchDto: CreateBranchDto) {
    const branch = await this.branchRepo.create(createBranchDto)
    return await this.branchRepo.save(branch)
  }

  async findAll() {
    return await this.branchRepo.find({})
  }

  async findOne(id: number) {
    const Branch = await this.branchRepo.findOne({ where: { id } })
        if (!Branch) {
          throw new NotFoundException("not found")
        }
        return Branch
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(id)
    Object.assign(branch, updateBranchDto)
    return await this.branchRepo.save(branch)
  }

  async remove(id: number) {
    const branch = await this.findOne(id)
    await this.branchRepo.remove(branch)
    return { message: "branch deleted" }
  }
}
