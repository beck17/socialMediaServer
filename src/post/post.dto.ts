import { IsString } from 'class-validator'

export class PostDto {
	@IsString()
	text: string

	@IsString()
	image?: string
}
