import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateUserDto {
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
    description: 'numero de telefone do usuário',
    example: '(55) 99999-9999',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Senha',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

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
