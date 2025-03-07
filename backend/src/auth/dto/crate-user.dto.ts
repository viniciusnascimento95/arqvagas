import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAuthDto {
  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'Nome  do Usuário',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'O e-mail do usuário.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'numero de telefone do usuário',
    example: '(55) 99999-9999',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'A senha do usuário.',
    example: '123456',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
