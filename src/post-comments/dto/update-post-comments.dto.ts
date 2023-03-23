import { IsString } from 'class-validator'

export class UpdatePostCommentsDto {
	@IsString()
	text: string
}
