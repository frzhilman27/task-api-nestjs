import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task', example: 'Buy groceries' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false, example: 'Buy milk, eggs, and bread' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the task is completed', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
