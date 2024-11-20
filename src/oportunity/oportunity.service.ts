import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOportunityDto } from './dto/create-oportunity.dto';

@Injectable()
export class OportunityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOportunityDto: CreateOportunityDto) {
    return this.prisma.oportunity.create({
      data: createOportunityDto,
    });
  }

  async findAll() {
    return this.prisma.oportunity.findMany();
  }

  async findOne(id: number) {
    return this.prisma.oportunity.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateOportunityDto: Partial<CreateOportunityDto>) {
    return this.prisma.oportunity.update({
      where: { id },
      data: updateOportunityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.oportunity.delete({
      where: { id },
    });
  }
}
