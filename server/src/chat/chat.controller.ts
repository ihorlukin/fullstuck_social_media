import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ChatService } from './chat.service';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

	@HttpCode(200)
  @Auth()
  @Get()
  async getAll(@CurrentUser("id") id: string){
    return this.chatService.getChats(id)
  }
  
  @HttpCode(200)
  @Auth()
  @Post(":id")
  async create(@CurrentUser("id") userId: string, @Param("id") id: string){
    return this.chatService.createChat(userId, id)
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string){
    return this.chatService.deleteChat(id)
  }

  @HttpCode(200)
  @Auth()
  @Get(":id")
  async getOne(@Param("id") chatId: string){
    return this.chatService.getOne(chatId)
  }
}
