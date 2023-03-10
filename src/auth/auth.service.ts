import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { JwtService } from '@nestjs/jwt'

import { UserModel } from '../user/user.model'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly UserModel: ModelType<UserModel>,
		private readonly JwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const candidate = await this.UserModel.findOne({
			phoneNumber: dto.phoneNumber,
		})
		if (candidate)
			throw new BadRequestException('Этот номер телефона уже занят')

		const salt = await genSalt(10)
		const newUser = await new this.UserModel({
			phoneNumber: dto.phoneNumber,
			firstName: dto.firstName,
			lastName: dto.lastName,
			password: await hash(dto.password, salt),
		})

		await newUser.save()

		return this.returnUserFields(newUser)
	}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto) // Валидирование

		const token = await this.issueTokenPair(String(user._id)) // Генерация токена

		return {
			user: this.returnUserFields(user),
			...token,
		}
	}

	// Валидация юзера
	async validateUser(dto: LoginDto) {
		const user = await this.UserModel.findOne({ phoneNumber: dto.phoneNumber })
		if (!user) throw new UnauthorizedException('Неверный логин или пароль')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) new UnauthorizedException('Неверный логин или пароль')

		return user
	}

	// Генерация токена
	async issueTokenPair(_id: string) {
		const data = { _id }

		const accessToken = this.JwtService.sign(data, {
			expiresIn: '1h',
		})

		const refreshToken = this.JwtService.sign(data, {
			expiresIn: '10d',
		})

		return { accessToken, refreshToken }
	}

	// Возвращение нужных полей
	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
		}
	}
}
