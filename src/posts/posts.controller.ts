import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/interfaces/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-request.interface';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new post' })
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: AuthenticatedUser) {
    return this.postsService.create(createPostDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update your post' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.postsService.update(id, updatePostDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete your post' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.postsService.remove(id, user.userId);
  }
}
