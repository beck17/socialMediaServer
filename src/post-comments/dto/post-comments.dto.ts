import { IsObjectId } from 'class-validator-mongo-object-id'
import { IsString } from 'class-validator'

export class PostCommentsDto {
	@IsString()
	text: string

	@IsObjectId()
	postId: string
}
