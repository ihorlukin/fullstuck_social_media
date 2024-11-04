import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService){}
  
  async getChats(id: string){
    return this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id
          }
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        },
        messages: true
      },
    })
  }

  async deleteChat(id: string) {
    return await this.prisma.chat.delete({
      where: {
        id
      }
    })
  }

  async createChat(userId: string, id: string){
    return await this.prisma.chat.create({
      data: {
        chatName: "sender",
        users: {
          connect: [
            {id: userId},
            {id: id},
          ]
        },
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              profilePic: true
            }
          },
          messages: true
        },
      },
    );
  }

 async getOne(chatId: string){
  return await this.prisma.chat.findUnique({
    where: {
      id: chatId
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        }
      },
      messages: {
        include: {
          sender: true,
        }
      }
    },
  })

 }
}
