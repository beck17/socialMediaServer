import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(5000, () => {
		console.log('SERVER START')
	})
}

start()

// TODO: сделать сервис по медиа файлам
