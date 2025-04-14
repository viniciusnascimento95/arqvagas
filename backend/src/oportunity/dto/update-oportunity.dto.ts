import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOportunityDto {
  @ApiPropertyOptional({
    description: 'Título do trabalho',
    example: 'Software Engineer',
  })
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiPropertyOptional({
    description: 'Tipo de contrato',
    example: 'CLT',
  })
  @IsString()
  @IsOptional()
  contractType?: string;

  @ApiPropertyOptional({
    description: 'Requisitos do trabalho',
    example: ['JavaScript', 'React', 'Node.js'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[];

  @ApiPropertyOptional({
    description: 'Descrição do trabalho',
    example: 'Desenvolver e manter aplicações web.',
  })
  @IsString()
  @IsOptional()
  jobDescription?: string;

  @ApiPropertyOptional({
    description: 'Nível de experiência',
    example: 'Senior',
  })
  @IsString()
  @IsOptional()
  experienceLevel?: string;

  @ApiPropertyOptional({
    description: 'Benefícios oferecidos',
    example: ['Plano de saúde', 'Vale alimentação'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @ApiPropertyOptional({
    description: 'Local de trabalho',
    example: 'São Paulo - SP',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Horário de trabalho',
    example: 'Segunda a Sexta, das 9h às 18h',
  })
  @IsString()
  @IsOptional()
  workSchedule?: string;

  @ApiPropertyOptional({
    description: 'Número de vagas disponíveis',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  availablePositions?: number;

  @ApiPropertyOptional({
    description: 'Data esperada para início',
    example: '2024-12-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  expectedStartDate?: Date;

  @ApiPropertyOptional({
    description: 'Informações da empresa',
    example: {
      name: 'Tech Company',
      industry: 'Technology',
    },
  })
  @IsObject()
  @IsOptional()
  companyInfo?: {
    name?: string;
    industry?: string;
    teamSize?: string;
  };

  @ApiPropertyOptional({
    description: 'Principais responsabilidades',
    example: ['Desenvolver funcionalidades', 'Participar de reuniões'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mainResponsibilities?: string[];

   @ApiPropertyOptional({
      description: 'Ferramentas e softwares necessários',
      example: [
        { tool: '123teste', level: 'Não tenho' },
        { tool: 'abc 123', level: 'Básico' }
      ],
      type: 'array',
    })
    @IsArray()
    @IsObject({ each: true })
    toolsAndSoftware: { tool: string; level: string }[];

  @ApiPropertyOptional({
    description: 'Data de publicação da vaga',
    example: '2024-11-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publicationDate?: Date;

  @ApiPropertyOptional({
    description: 'Prazo para candidaturas',
    example: '2024-11-30T23:59:59.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  applicationDeadline?: Date;

  @ApiPropertyOptional({
    description: 'Indica se a vaga está disponível',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
