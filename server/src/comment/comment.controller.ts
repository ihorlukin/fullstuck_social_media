import {
	Body,
  Post,
	Controller,
	Get,
  Delete,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
  Param
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CommentCreationDto } from './comment.interface';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController{
  constructor(private readonly commentService: CommentService){}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get(':postId')
	@Auth()
	async getComments(@Param('postId') postId: string) {
		return this.commentService.getComments(postId)
	}


	@HttpCode(200)
	@Post()
	@Auth()
	async addComment(@Body() body: CommentCreationDto, @CurrentUser('id') userId: string) {
		return this.commentService.addComment(body, userId)
	}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(":id")
	@Auth()
	async deleteComment(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.commentService.deleteComment(id, userId)
	}

}