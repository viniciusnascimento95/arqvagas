import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOportunityDto } from './dto/create-oportunity.dto';
import { OportunityService } from './oportunity.service';

@Controller('oportunity')
export class OportunityController {
  constructor(private readonly oportunityService: OportunityService) { }

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
    @Body() updateOportunityDto: Partial<CreateOportunityDto>,
  ) {
    return this.oportunityService.update(+id, updateOportunityDto);
  }
  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: boolean,
  ) {
    return this.oportunityService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oportunityService.remove(+id);
  }
}
