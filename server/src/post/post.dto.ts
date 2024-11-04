import { IsString } from "class-validator";

export class PostDto{

  @IsString()
  desc: string

  @IsString()
  img: string
  
  @IsString()
  authorId: string
}