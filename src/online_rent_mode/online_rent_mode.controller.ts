import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnlineRentModeService } from './online_rent_mode.service';
import { CreateOnlineRentModeDto } from './dto/create-online_rent_mode.dto';
import { UpdateOnlineRentModeDto } from './dto/update-online_rent_mode.dto';

@Controller('online-rent-mode')
export class OnlineRentModeController {
  constructor(private readonly onlineRentModeService: OnlineRentModeService) {}

  @Post()
  create(@Body() createOnlineRentModeDto: CreateOnlineRentModeDto) {
    return this.onlineRentModeService.create(createOnlineRentModeDto);
  }

  @Get()
  findAll() {
    return this.onlineRentModeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineRentModeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnlineRentModeDto: UpdateOnlineRentModeDto) {
    return this.onlineRentModeService.update(+id, updateOnlineRentModeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineRentModeService.remove(+id);
  }
}
