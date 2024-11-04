import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';



@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService){}

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const { content, chatId} = createMessageDto

    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId
      }
    })

    if(!chat) throw new NotFoundException("chat doesn`t exist")

     const newMessage = await this.prisma.message.create({
      data: {
        content,
        chatId,
        senderId: userId
      },
      include: {
        sender: {
          select: {
            username: true,
            id: true,
            profilePic: true
          }
        },
        chat: {
          include: {
            users: {
              select: {
                username: true,
                id: true,
                profilePic: true
              }
            }
          }
        }
      }
    })
    await this.prisma.chat.update({
      where: { id: chatId },
      data: {
        latestMessageId: newMessage.id
      },
    });
    return newMessage
  }

  async findAll(chatId: string) {

    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId
      }
    })

    if(!chat) throw new NotFoundException("Chat doesn`t exist")
    
    return await this.prisma.message.findMany({
      where: {
        chatId,
      },
      include: {
        sender: {
          select: {
            username: true,
            id: true,
            profilePic: true
          }
        },
        chat: true
      }
    })
  }
}
