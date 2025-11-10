import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles, UserRole } from '../app.constants';
import { Public } from '../common/decorators/public.decorator';

@Controller('client')
@UseGuards(RolesGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.clientService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
