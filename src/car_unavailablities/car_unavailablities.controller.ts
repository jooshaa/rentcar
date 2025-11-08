import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarUnavailablitiesService } from './car_unavailablities.service';
import { CreateCarUnavailablityDto } from './dto/create-car_unavailablity.dto';
import { UpdateCarUnavailablityDto } from './dto/update-car_unavailablity.dto';

@Controller('car-unavailablities')
export class CarUnavailablitiesController {
  constructor(private readonly carUnavailablitiesService: CarUnavailablitiesService) {}

  @Post()
  create(@Body() createCarUnavailablityDto: CreateCarUnavailablityDto) {
    return this.carUnavailablitiesService.create(createCarUnavailablityDto);
  }

  @Get()
  findAll() {
    return this.carUnavailablitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carUnavailablitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarUnavailablityDto: UpdateCarUnavailablityDto) {
    return this.carUnavailablitiesService.update(+id, updateCarUnavailablityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carUnavailablitiesService.remove(+id);
  }
}
