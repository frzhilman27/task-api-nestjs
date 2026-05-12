import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  postId: number;
}

export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}