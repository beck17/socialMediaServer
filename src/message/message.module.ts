import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { MessageModel } from './message.model'
import { ConversationModel } from '../conversation/conversation.model'
import { ConversationService } from '../conversation/conversation.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MessageModel,
				schemaOptions: { collection: 'messages' },
			},
			{
				typegooseClass: ConversationModel,
				schemaOptions: { collection: 'conversations' },
			},
		]),
	],
	controllers: [MessageController],
	providers: [MessageService, ConversationService],
})
export class MessageModule {}
