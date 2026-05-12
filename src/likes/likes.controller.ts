import { Controller, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/interfaces/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-request.interface';

@ApiTags('likes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({ summary: 'Like a post' })
  create(@Body() createLikeDto: CreateLikeDto, @CurrentUser() user: AuthenticatedUser) {
    return this.likesService.create(createLikeDto, user.userId);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Unlike a post' })
  remove(@Param('postId', ParseIntPipe) postId: number, @CurrentUser() user: AuthenticatedUser) {
    return this.likesService.remove(postId, user.userId);
  }
}
