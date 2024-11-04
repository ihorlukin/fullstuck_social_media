import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PostDto } from "./post.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async getPosts(userId: string){
    console.log(`userID: ${userId}`)
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user) throw new NotFoundException("")

    return await this.prisma.post.findMany({
      where: {
        authorId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        comments:{
          include: {
            author: {
              select: {
                id: true,
                username: true,
                profilePic: true,
              }
            }
          }
        },
        author: {
          select: {
            username: true,
            id: true,
            profilePic: true,
          }
        },
        likes: true,
      },
      
    })
  }
  
  async addPost(body: PostDto) {
    console.log("Create Post_________________")
    const { desc, img, authorId} = body
    
    return await this.prisma.post.create({
      data: {
        desc,
        img,
        authorId: authorId
      }
    })
  }

  async deletePost(id: string) {
    console.log("DELETE POST:" + id)
    const result =  await this.prisma.post.delete({
      where: {
        id
      }
    })

    if(result) return {status: 'success'}
  }


  async addLikeToPost(postId: string, userId: string) {

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if(!post) throw new NotFoundException("Post not found")


    const result =  await this.prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          connect: { id: userId }
        }
      }
    });

    if ( result ) return {status: 'success'}
  }

  async removeLikeFromPost(postId: string, userId: string) {

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if(!post) throw new NotFoundException("Post not found")

    const result =  await this.prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          disconnect: { id: userId }
        }
      }
    });
    
    if ( result ) return {status: 'success'}
  }

}