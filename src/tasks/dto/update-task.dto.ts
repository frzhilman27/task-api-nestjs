import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Title of the task', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the task is completed', required: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
