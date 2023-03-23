import { Module } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConversationModel } from './conversation.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ConversationModel,
				schemaOptions: { collection: 'conversations' },
			},
		]),
	],
	controllers: [ConversationController],
	providers: [ConversationService],
})
export class ConversationModule {}
