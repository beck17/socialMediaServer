import { IsObjectId } from 'class-validator-mongo-object-id'

export class PostLikeDto {
	@IsObjectId()
	postId: string
}
