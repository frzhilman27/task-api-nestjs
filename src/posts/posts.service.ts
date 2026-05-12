import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } }, _count: { select: { likes: true, comments: true } } }
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } }, comments: true, _count: { select: { likes: true } } }
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, authorId: number) {
    const post = await this.findOne(id);
    if (post.authorId !== authorId) throw new ForbiddenException('You can only update your own posts');
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, authorId: number) {
    const post = await this.findOne(id);
    if (post.authorId !== authorId) throw new ForbiddenException('You can only delete your own posts');
    return this.prisma.post.delete({ where: { id } });
  }
}
