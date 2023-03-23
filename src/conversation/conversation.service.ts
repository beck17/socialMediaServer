import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ConversationModel } from './conversation.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'

@Injectable()
export class ConversationService {
	constructor(
		@InjectModel(ConversationModel)
		private readonly ConversationModel: ModelType<ConversationModel>,
	) {}

	async getById(id: Types.ObjectId) {
		return this.ConversationModel.findById(id)
			.populate({
				path: 'messages',
				populate: ['userFrom', 'userTo'],
			})
			.exec()
	}

	async createConversation() {
		return this.ConversationModel.create({
			messages: [],
		})
	}

	async pushNewMessage(
		conversationId: Types.ObjectId,
		messageId: Types.ObjectId,
	) {
		const conversation = await this.ConversationModel.findById(
			conversationId,
		).exec()
		if (!conversation) throw new NotFoundException('Диалог не найден')

		conversation.messages = [...conversation.messages, messageId]

		return conversation.save()
	}
}
