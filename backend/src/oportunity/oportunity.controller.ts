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
import { ApplyOportunityDto } from './dto/apply-oportunity.dto';
import { CreateOportunityDto } from './dto/create-oportunity.dto';
import { UnApplyOportunityDto } from './dto/unapply-oportunity.dto';
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
  @Get(':id/applications')
  findApplications(@Param('id') id: string) {
    return this.oportunityService.findApplications(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOportunityDto: Partial<CreateOportunityDto>,
  ) {
    return this.oportunityService.update(+id, updateOportunityDto);
  }
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: boolean) {
    return this.oportunityService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oportunityService.remove(+id);
  }

  @Post('apply')
  applyOportunity(@Body() applyOportunityDto: ApplyOportunityDto) {
    return this.oportunityService.applyOportunity(
      Number(applyOportunityDto.userId),
      Number(applyOportunityDto.oportunityId),
      applyOportunityDto.comment,
    );
  }

  @Post('unapply')
  unapplyOportunity(@Body() unApplyOportunityDto: UnApplyOportunityDto) {
    return this.oportunityService.unapplyOportunity(
      Number(unApplyOportunityDto.userId),
      Number(unApplyOportunityDto.oportunityId),
    );
  }
}
