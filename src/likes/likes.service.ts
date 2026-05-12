import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto, authorId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: createLikeDto.postId } });
    if (!post) throw new NotFoundException('Post not found');

    const existingLike = await this.prisma.like.findUnique({
      where: {
        postId_authorId: {
          postId: createLikeDto.postId,
          authorId,
        },
      },
    });

    if (existingLike) {
      throw new ConflictException('You already liked this post');
    }

    return this.prisma.like.create({
      data: {
        postId: createLikeDto.postId,
        authorId,
      },
    });
  }

  async remove(postId: number, authorId: number) {
    const like = await this.prisma.like.findUnique({
      where: {
        postId_authorId: {
          postId,
          authorId,
        },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    return this.prisma.like.delete({
      where: {
        postId_authorId: {
          postId,
          authorId,
        },
      },
    });
  }
}
