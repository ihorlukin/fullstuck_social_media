import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CommentModule,
    PostModule,
    MessageModule,
    ChatModule,
    FileModule,
  ]
})
export class AppModule {}
