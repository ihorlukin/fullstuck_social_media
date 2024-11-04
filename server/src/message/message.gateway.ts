import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@WebSocketGateway(80, {cors: {origin: true}})
export class MessageGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly userService: UserService
  ){
    console.log("WebSocket server is running on port 80");
  }

  

  @WebSocketServer() server: Server;

    
  @SubscribeMessage('message:get')
	async getConversation(@MessageBody('conversation') conversationId: string) {
		if (!conversationId) return

    const conversation = await this.chatService.getOne(conversationId)
    console.log("From WEBSOCKET",conversation)
		this.server.to(conversationId).emit('conversation', conversation)
	}

  @SubscribeMessage('message:add')
  async addMessage(
    @MessageBody() message: CreateMessageDto & {userId: string}) {
    await this.messageService.create(message, message.userId)
    
    await this.getConversation(message.chatId)
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(
    @MessageBody("conversationId") conversationId: string, 
    @ConnectedSocket() socket: Socket
  ) {
    socket.join(conversationId);
    socket.emit('joinedRoom', conversationId)
    await this.getConversation(conversationId)
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(
    @MessageBody('conversationId') conversationId: string, 
    @ConnectedSocket() socket: Socket
  ) {
    socket.leave(conversationId);
    socket.emit('leftRoom', conversationId)
  }

  
  @SubscribeMessage('typing')
  handleTyping(@MessageBody() room: string): void {
    this.server.in(room).emit('typing');
  }

  @SubscribeMessage('stop typing')
  handleStopTyping(@MessageBody() room: string): void {
    this.server.in(room).emit('stop typing');
  }

  @SubscribeMessage('user:online')
   async handleUserOnline(
      @MessageBody() userId: string, 
      @ConnectedSocket() socket: Socket
    ){
      socket.join(userId)
      console.log("userOnline", userId)
      const [followers, following] = await Promise.all([
        this.userService.getFollowers(userId).then(users => users.map(u => u.id)),
        this.userService.getFollowing(userId).then(users => users.map(u => u.id)),
      ]);

      const all = new Set([...followers, ...following])
      
      all.forEach(id =>
        socket.to(id).emit('user:online', userId)
        )
    }

    @SubscribeMessage('user:offline')
    async handleUserOffline(
      @MessageBody() userId: string, 
      @ConnectedSocket() socket: Socket
    ){
      socket.leave(userId)
      console.log("USERDISCONECTED", userId)
      const [followers, following] = await Promise.all([
        this.userService.getFollowers(userId).then(users => users.map(u => u.id)),
        this.userService.getFollowing(userId).then(users => users.map(u => u.id)),
      ]);

      const all = new Set([...followers, ...following])

      all.forEach(id =>
        socket.to(id).emit('user:offline', userId)
        )
    }
  // Вы можете добавить дополнительные методы для обработки подключения и отключения, если это нужно
}