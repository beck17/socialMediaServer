import { IsString } from 'class-validator'

export class UserDto {
	@IsString()
	firstName?: string

	@IsString()
	lastName?: string

	@IsString()
	avatar?: string

	@IsString()
	backgroundPic?: string

	@IsString()
	city?: string

	@IsString()
	birthday?: string
}
