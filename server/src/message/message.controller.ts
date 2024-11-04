import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() createMessageDto: CreateMessageDto, @CurrentUser("id") userId: string) {
    return this.messageService.create(createMessageDto, userId);
  }

  @HttpCode(200)
  @Get(":chatId")
  @Auth()
  findAllMessages(@Param("chatId") chatId: string) {
    return this.messageService.findAll(chatId);
  }

}
