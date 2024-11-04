import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['log', 'error', 'warn', 'debug', 'verbose']
	})

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: true,
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	await app.listen(4000)
}
bootstrap()
