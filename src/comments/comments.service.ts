import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, authorId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: createCommentDto.postId } });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
        authorId,
      },
    });
  }

  findAllByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { id: true, name: true, email: true } } }
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } }
    });
    if (!comment) throw new NotFoundException(`Comment with ID ${id} not found`);
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, authorId: number) {
    const comment = await this.findOne(id);
    if (comment.authorId !== authorId) throw new ForbiddenException('You can only update your own comments');
    return this.prisma.comment.update({
      where: { id },
      data: { content: updateCommentDto.content },
    });
  }

  async remove(id: number, authorId: number) {
    const comment = await this.findOne(id);
    if (comment.authorId !== authorId) throw new ForbiddenException('You can only delete your own comments');
    return this.prisma.comment.delete({ where: { id } });
  }
}
