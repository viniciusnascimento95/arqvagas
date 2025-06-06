import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOportunityDto {
  @ApiProperty({
    description: 'Título do trabalho',
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ description: 'Vaga gerênciada ?', example: 'Sim | Não' })
  @IsString()
  @IsNotEmpty()
  managedJob: string;

  @ApiProperty({ description: 'Url da vaga externa', example: 'url' })
  @IsString()
  externalUrl: string;

  @ApiProperty({ description: 'Tipo de contrato', example: 'CLT' })
  @IsString()
  @IsNotEmpty()
  contractType: string;

  @ApiProperty({
    description: 'Requisitos do trabalho',
    example: ['JavaScript', 'React', 'Node.js'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @ApiProperty({
    description: 'Descrição do trabalho',
    example: 'Desenvolver e manter aplicações web.',
  })
  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ApiProperty({ description: 'Nível de experiência', example: 'Senior' })
  @IsString()
  @IsNotEmpty()
  experienceLevel: string;

  @ApiProperty({
    description: 'Benefícios oferecidos',
    example: ['Plano de saúde', 'Vale alimentação'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @ApiProperty({ description: 'Local de trabalho', example: 'São Paulo - SP' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Horário de trabalho',
    example: 'Segunda a Sexta, das 9h às 18h',
  })
  @IsString()
  @IsNotEmpty()
  workSchedule: string;

  @ApiProperty({ description: 'Número de vagas disponíveis', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  availablePositions: number;

  @ApiProperty({
    description: 'Data esperada para início',
    example: '2024-12-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  expectedStartDate: Date;

  @ApiProperty({
    description: 'Informações da empresa',
    example: {
      name: 'Tech Company',
      industry: 'Technology',
    },
  })
  @IsObject()
  companyInfo: {
    name: string;
    industry: string;
    teamSize: string;
  };

  @ApiProperty({
    description: 'Principais responsabilidades',
    example: ['Desenvolver funcionalidades', 'Participar de reuniões'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  mainResponsibilities: string[];

  @ApiProperty({
    description: 'Ferramentas e softwares necessários',
    example: [
      { tool: '123teste', level: 'Não tenho' },
      { tool: 'abc 123', level: 'Básico' },
    ],
    type: 'array',
  })
  @IsArray()
  @IsObject({ each: true })
  toolsAndSoftware: { tool: string; level: string }[];

  @ApiProperty({
    description: 'Data de publicação da vaga',
    example: '2024-11-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  publicationDate: Date;

  @ApiProperty({
    description: 'Prazo para candidaturas',
    example: '2024-11-30T23:59:59.000Z',
  })
  @IsDate()
  @Type(() => Date)
  applicationDeadline: Date;

  @ApiPropertyOptional({
    description: 'Indica se a vaga está disponível',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
