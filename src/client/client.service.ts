import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>
  ) { }
  async create(createClientDto: CreateClientDto) {
    const client = await this.clientRepo.create(createClientDto)
    return await this.clientRepo.save(client)
  }

  async findAll() {
    return this.clientRepo.find({})
  }

  async findOne(id: number) {
    const Client   = await this.clientRepo.findOne({ where: { id } })
            if (!Client ) {
              throw new NotFoundException("not found")
            }
            return Client 
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id)
    Object.assign(client, updateClientDto)
    return await this.clientRepo.save(client)
  }

  async remove(id: number) {
    const client = await this.findOne(id)
    await this.clientRepo.remove(client)
    return { message: "client deleted" }
  } 
}
