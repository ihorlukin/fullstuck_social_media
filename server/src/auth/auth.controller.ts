import { Body, Controller, HttpCode, Post,Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import {Request, Response } from "express"

import { AuthService } from "./auth.service";
import { AuthDto, IAuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: IAuthDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, ...response } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
    try {
      const { refreshToken, ...response } = await this.authService.register(dto);
      this.authService.addRefreshTokenToResponse(res, refreshToken);

      return response;
    } catch (e) {
			if(e.code === 'P2002') throw new BadRequestException('this name already exist')
			throw new BadRequestException('error')
		}

  }


	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponse(res)
			throw new UnauthorizedException('Refresh token not passed')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res)
		return true
	}
}


