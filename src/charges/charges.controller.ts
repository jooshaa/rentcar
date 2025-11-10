import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { UserRole } from '../app.constants';
import { Public } from '../common/decorators/public.decorator';

@Controller('charges')
@UseGuards(RolesGuard)
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargesService.create(createChargeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.chargesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargesService.findOne(+id);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargesService.update(+id, updateChargeDto);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargesService.remove(+id);
  }
}
