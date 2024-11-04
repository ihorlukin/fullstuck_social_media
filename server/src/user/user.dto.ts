import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
  @IsString()
  usertype: string
  
  @IsString()
  type1: string

  @IsString()
  country: string

  @IsString()
  city: string

  @IsString()
  profilePic: string

  @IsString()
  coverPic: string

  @IsString()
  website: string
}