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
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  contractType: string;

  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  experienceLevel: string;

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  workSchedule: string;

  @IsNumber()
  @IsNotEmpty()
  availablePositions: number;

  @IsDate()
  @Type(() => Date) // Transforma a string ISO em uma instância de Date
  expectedStartDate: Date;

  @IsObject()
  companyInfo: {
    name: string;
    industry: string;
    teamSize: string;
  };

  @IsArray()
  @IsString({ each: true })
  mainResponsibilities: string[];

  @IsArray()
  @IsString({ each: true })
  toolsAndSoftware: string[];

  @IsDate()
  @Type(() => Date) // Transforma a string ISO em uma instância de Date
  publicationDate: Date;

  @IsDate()
  @Type(() => Date) // Transforma a string ISO em uma instância de Date
  applicationDeadline: Date;

  @IsBoolean()
  @IsOptional() // Torna a propriedade opcional no momento da criação
  isAvailable?: boolean; // Indica se a vaga está disponível
}
