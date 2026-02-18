import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {

  @ApiProperty({ example: 'Belajar NestJS' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Persiapan test backend' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
