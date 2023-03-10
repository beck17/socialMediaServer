import { IsNumber, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@IsNumber()
	phoneNumber: number

	@IsString()
	firstName: string

	@IsString()
	lastName: string

	@MinLength(6, {
		message: 'Пароль должен быть минимум 6 символов',
	})
	@IsString()
	password: string
}
