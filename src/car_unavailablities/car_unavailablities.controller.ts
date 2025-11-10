import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarUnavailablitiesService } from './car_unavailablities.service';
import { CreateCarUnavailablityDto } from './dto/create-car_unavailablity.dto';
import { UpdateCarUnavailablityDto } from './dto/update-car_unavailablity.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles, UserRole } from '../app.constants';

@Controller('car-unavailablities')
@UseGuards(RolesGuard)
export class CarUnavailablitiesController {
  constructor(private readonly carUnavailablitiesService: CarUnavailablitiesService) {}

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  create(@Body() createCarUnavailablityDto: CreateCarUnavailablityDto) {
    return this.carUnavailablitiesService.create(createCarUnavailablityDto);
  }

  @Get()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  findAll() {
    return this.carUnavailablitiesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.carUnavailablitiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateCarUnavailablityDto: UpdateCarUnavailablityDto) {
    return this.carUnavailablitiesService.update(+id, updateCarUnavailablityDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.carUnavailablitiesService.remove(+id);
  }
}
