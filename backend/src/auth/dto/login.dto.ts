import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'O e-mail do usuário.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário.',
    example: '123456',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
