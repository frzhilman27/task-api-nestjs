import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/interfaces/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-request.interface';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new comment' })
  create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.commentsService.create(createCommentDto, user.userId);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all comments for a post' })
  findAllByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAllByPost(postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update your comment' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.commentsService.update(id, updateCommentDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete your comment' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.commentsService.remove(id, user.userId);
  }
}
