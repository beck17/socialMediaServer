import { IsNumber, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@IsNumber()
	phoneNumber: number

	@MinLength(6, {
		message: 'Пароль должен быть минимум 6 символов',
	})
	@IsString()
	password: string
}
