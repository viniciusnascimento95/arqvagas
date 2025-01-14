import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'A nova senha deve ter pelo menos 8 caracteres',
  })
  newPassword: string;
}
