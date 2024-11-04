import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorators";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { PostDto } from "./post.dto";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private postService: PostService){}
  
  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get(':userId')
	@Auth()
  async getPosts(@Param("userId") userId: string){
    return this.postService.getPosts(userId)
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
  async addPosts(@Body() body: PostDto,){
    return this.postService.addPost(body)
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(":id")
	@Auth()
  async deletePosts(@Param("id") id: string){
    return this.postService.deletePost(id)
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put("like/:id")
	@Auth()
  async addLike(@CurrentUser("id") userId: string, @Param("id") postId: string){
    return this.postService.addLikeToPost( postId, userId)
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put("unlike/:id")
	@Auth()
  async removeLike(@CurrentUser("id") userId: string, @Param("id") postId: string){
    return this.postService.removeLikeFromPost( postId, userId)
  }
}