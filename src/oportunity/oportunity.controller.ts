import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOportunityDto } from './dto/create-oportunity.dto';
import { UpdateOportunityDto } from './dto/update-oportunity.dto';
import { OportunityService } from './oportunity.service';

@Controller('oportunity')
export class OportunityController {
  constructor(private readonly oportunityService: OportunityService) {}

  @Post()
  create(@Body() createOportunityDto: CreateOportunityDto) {
    return this.oportunityService.create(createOportunityDto);
  }

  @Get()
  findAll() {
    return this.oportunityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oportunityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOportunityDto: UpdateOportunityDto,
  ) {
    return this.oportunityService.update(+id, updateOportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oportunityService.remove(+id);
  }
}
