import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João teste',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email do usuário',
    example: 'email@teste.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nome da escola do usuário',
    example: 'Escola Técnica Teste',
  })
  @IsString()
  @IsOptional()
  school?: string;

  @ApiProperty({
    description: 'Data de início na escola',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  init_date_school?: Date;

  @ApiProperty({
    description: 'Data de término na escola',
    example: '2024-12-31T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_date_school?: Date;

  @ApiProperty({
    description: 'Habilidades técnicas do usuário',
    example: ['JavaScript', 'NestJS', 'React'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  software_skills?: string[];

  @ApiProperty({
    description: 'Habilidades pessoais do usuário',
    example: ['Comunicação', 'Trabalho em equipe'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  personal_skills?: string[];

  @ApiProperty({
    description: 'URL do portfólio do usuário',
    example: 'https://meuportfolio.com',
  })
  @IsUrl()
  @IsOptional()
  portfolio_url?: string;
}