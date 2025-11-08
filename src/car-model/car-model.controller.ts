import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('CarModels') 
@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) { }

  @Post()
  @ApiBody({ type: CreateCarModelDto })
  @ApiResponse({ status: 201, description: 'Car model created', type: CreateCarModelDto })
  create(@Body() createCarModelDto: CreateCarModelDto) {
    return this.carModelService.create(createCarModelDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of car models', type: [CreateCarModelDto] })
  findAll() {
    return this.carModelService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Car model ID' })
  @ApiResponse({ status: 200, description: 'Car model found', type: CreateCarModelDto })
  findOne(@Param('id') id: string) {
    return this.carModelService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Car model ID' })
  @ApiBody({ type: UpdateCarModelDto })
  @ApiResponse({ status: 200, description: 'Car model updated', type: UpdateCarModelDto })
  update(@Param('id') id: string, @Body() updateCarModelDto: UpdateCarModelDto) {
    return this.carModelService.update(+id, updateCarModelDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Car model ID' })
  @ApiResponse({ status: 200, description: 'Car model deleted' })
  remove(@Param('id') id: string) {
    return this.carModelService.remove(+id);
  }
}