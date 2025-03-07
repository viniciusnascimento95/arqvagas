import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ApplyOportunityDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'ID da vaga',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  oportunityId: string;

  @ApiPropertyOptional({
    description: 'Comentário opcional sobre a candidatura',
    example: 'Tenho grande interesse nesta oportunidade',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
