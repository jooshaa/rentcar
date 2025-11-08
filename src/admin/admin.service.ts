import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    const client = await this.adminRepo.create(createAdminDto)
    return await this.adminRepo.save(client)
  }

  async findAll() {
    return this.adminRepo.find({})
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } })
    if (!admin) {
      throw new NotFoundException("not found")
    }
    return admin
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const client = await this.findOne(id)
    Object.assign(client, updateAdminDto)
    return await this.adminRepo.save(client)
  }

  async remove(id: number) {
    const admin = await this.findOne(id)
    await this.adminRepo.remove(admin)
    return { message: "admin deleted" }
  }
}
