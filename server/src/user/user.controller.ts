import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Param, Patch, Post, Query, Req } from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'
import { UpdateUserDto } from './user.dto'
import { SearchQuery } from 'src/interface/user.interface'

@Controller('profile')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Get()
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async getOne(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch()
	@Auth()
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.update(id, dto)
	}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('search-users')
	@Auth()
	async searchUsers(@Query("search") query: string, @CurrentUser('id') id: string) {
		return this.userService.search(query, id)
	}  

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('follow/:id')
	@Auth()
	async follow(@Param("id") followingId: string, @CurrentUser('id') id: string) {
		return this.userService.follow(followingId, id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('unfollow/:id')
	@Auth()
	async unfollow(@Param("id") followingId: string, @CurrentUser('id') id: string) {
		return this.userService.unfollow(followingId, id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('get-following/:id')
	@Auth()
	async getFollowing(@Param('id') id: string) {
		return this.userService.getFollowing(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('get-followers/:id')
	@Auth()
	async getFollowers(@Param('id') id: string) {
		return this.userService.getFollowers(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('search-users-by-filters')
	@Auth()
	async searchByFilter(@Body() body: SearchQuery) {
		return this.userService.searchByFilter(body)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('get-values-for-type-2')
	@Auth()
	async uniqueValuesForType2(@Body() body: {userType: string, userType1: string}) {
		return this.userService.uniqueValuesType2(body)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('unique')
	@Auth()
	async uniqueValues() {
		return this.userService.uniqueValues()
	}
}