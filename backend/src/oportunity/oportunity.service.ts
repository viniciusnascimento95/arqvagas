import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOportunityDto } from './dto/create-oportunity.dto';

@Injectable()
export class OportunityService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOportunityDto: CreateOportunityDto) {
    return this.prisma.oportunity.create({
      data: createOportunityDto,
    });
  }

  async findAll() {
    return this.prisma.oportunity.findMany({
      include: {
        Application: true,
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.oportunity.findUnique({
      where: { id },
      include: {
        Application: true,
      }
    });
  }

  async findApplications(id: number) {
    return this.prisma.application.findMany({
      where: { oportunityId: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            school: true,
            init_date_school: true,
            end_date_school: true,
            // personal_skills: true, descontinuado pois o usuário vai subir um arquivo com as skills
            // software_skills: true, descontinuado pois o usuário vai subir um arquivo com as skills
            portfolio_url: true,
          },
        },
      },
    });
  }
  async update(id: number, updateOportunityDto: Partial<CreateOportunityDto>) {
    return this.prisma.oportunity.update({
      where: { id },
      data: updateOportunityDto,
    });
  }

  async updateStatus(id: number, status: boolean) {
    return this.prisma.oportunity.update({
      where: { id },
      data: { isAvailable: status },
    });
  }

  async remove(id: number) {
    return this.prisma.oportunity.delete({
      where: { id },
    });
  }

  async applyOportunity(
    userId: number,
    oportunityId: number,
    comments?: string,
  ) {
    return this.prisma.application.create({
      data: {
        oportunityId: oportunityId,
        userId: userId,
        comment: comments,
      },
    });
  }

  async unapplyOportunity(
    userId: number,
    oportunityId: number
  ) {
    return this.prisma.application.delete({
      where: {
        userId_oportunityId: {
          userId: userId,
          oportunityId: oportunityId,
        },
      },
    });
  }

  
}
