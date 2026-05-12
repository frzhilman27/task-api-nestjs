import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  postId: number;
}