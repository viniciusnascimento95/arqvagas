import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OportunityController } from './oportunity.controller';
import { OportunityService } from './oportunity.service';

@Module({
  controllers: [OportunityController],
  providers: [OportunityService, PrismaService],
})
export class OportunityModule {}
