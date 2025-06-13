import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfessionalDto {
  @ApiProperty({
    description: 'URL do portfólio do usuário',
    example: 'https://meuportfolio.com',
  })
  @IsString()
  @IsOptional()
  portfolio_url?: string;

  @ApiProperty({
    description: 'Experiências profissionais',
    example: [
      { tool: '123teste', level: 'Não tenho' },
      { tool: 'abc 123', level: 'Básico' },
    ],
    type: 'array',
  })
  @IsArray()
  @IsObject({ each: true })
  experiences: { tool: string; level: string }[];

  @ApiProperty({
    description: 'Formação acadêmica',
    example: [
      { tool: '123teste', level: 'Não tenho' },
      { tool: 'abc 123', level: 'Básico' },
    ],
    type: 'array',
  })
  @IsArray()
  @IsObject({ each: true })
  education: { tool: string; level: string }[];

  @ApiProperty({
    description: 'Ferramentas e softwares',
    example: [
      { tool: 'ferramenta 1', level: 'Não tenho' },
      { tool: 'ferramenta 2', level: 'Básico' },
    ],
    type: 'array',
  })
  @IsArray()
  @IsObject({ each: true })
  tools: { tool: string; level: string }[];
}
