import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles, UserRole } from '../app.constants';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Brands') 
@Controller('brands')
@UseGuards(RolesGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({ status: 201, description: 'Brand created', type: CreateBrandDto })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @Public()
  @ApiResponse({ status: 200, description: 'List of brands', type: [CreateBrandDto] })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand found', type: CreateBrandDto })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
  @ApiBody({ type: UpdateBrandDto })
  @ApiResponse({ status: 200, description: 'Brand updated', type: UpdateBrandDto })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: Number, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand deleted' })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}