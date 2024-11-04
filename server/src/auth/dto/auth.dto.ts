import { MaxLength, IsEmail, IsString, MinLength } from "class-validator";


export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string

  @MinLength(6, {
    message: 'Username must be at least 6 characters long'
  })
  @MaxLength(20, {
    message: 'Username length must be maximum 20 characters'
  })
  @IsString()
  username: string

  @IsString()
  usertype: string
  
}

export interface IAuthDto{
  email: string
  password: string
}