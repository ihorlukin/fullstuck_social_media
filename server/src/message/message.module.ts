import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService, 
    MessageGateway, 
    ChatService, 
    PrismaService,
    UserService,
  ]
})
export class MessageModule {}
