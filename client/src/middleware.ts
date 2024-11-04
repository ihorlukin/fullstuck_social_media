import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const { url, cookies, nextUrl } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	console.log(refreshToken)
	const isAuthPage = url.includes('/auth/login')
	const isRegisterPage = url.includes('/auth/register')
	const isHomePage = nextUrl.pathname === '/'

	if (isAuthPage || isRegisterPage) {
		if (refreshToken) {
			// Пользователь авторизован, редирект на главную страницу
			return NextResponse.redirect(new URL('/i', url))
		}
		// Продолжайте на страницу логина или регистрации
		return NextResponse.next()
	}

	if (isHomePage && refreshToken) {
		return NextResponse.redirect(new URL('/i', url))
	}
	// Если нет токена и не на странице логина или регистрации
	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/i/:path*', '/']
}
