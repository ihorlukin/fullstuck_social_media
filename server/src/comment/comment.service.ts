import { Injectable } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma.service';
import { CommentCreationDto } from './comment.interface';



@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(postId: string) {

    const comments = await this.prisma.comment.findMany({
      where:{
        postId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        children: true,
        author: {
          select: {
            id: true,
            profilePic: true,
            username: true,
          }
        }
    },
  })

    console.log(comments)
    return comments
  }

  async addComment(body: CommentCreationDto, userId: string){
    const { content, postId} = body


    const parent: string | null = body?.parentId ?? null 
    console.log(parent)
    try{
     return await this.prisma.comment.create({
      data: {
        content: content,
        postId: postId,
        authorId: userId,
        parentId: parent,
      }
     })}catch(e){
      console.log(e.message)
     }
  }

  async deleteComment(id: string, userId: string) {

    const comment = await this.prisma.comment.findUnique({
      where: {
        id
      }
    })
    
    if (comment.authorId !== userId) throw new ForbiddenException('you can`t delete post')
    return await this.prisma.comment.delete({
      where: {
        id
      }
    })
  }
}