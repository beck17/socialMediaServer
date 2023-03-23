import { IsString } from 'class-validator'
import { Types } from 'mongoose'
import { IsObjectId } from 'class-validator-mongo-object-id'

export class MessageDto {
	@IsString()
	text: string

	@IsObjectId()
	userTo: Types.ObjectId

	@IsObjectId()
	conversationId: Types.ObjectId
}
