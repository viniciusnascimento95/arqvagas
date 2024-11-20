import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOportunityDto {
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsString()
  @IsOptional()
  contractType?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[];

  @IsString()
  @IsOptional()
  jobDescription?: string;

  @IsString()
  @IsOptional()
  experienceLevel?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  workSchedule?: string;

  @IsNumber()
  @IsOptional()
  availablePositions?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  expectedStartDate?: Date;

  @IsObject()
  @IsOptional()
  companyInfo?: {
    name?: string;
    industry?: string;
    teamSize?: string;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mainResponsibilities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  toolsAndSoftware?: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publicationDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  applicationDeadline?: Date;
}
