import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common'
import { MessageService } from './message.service'
import { Types } from 'mongoose'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'
import { MessageDto } from './message.dto'

@Controller('message')
export class MessageController {
	constructor(private readonly MessageService: MessageService) {}

	@Get('conversation/:userTo')
	@Auth()
	async getComments(
		@Param('userTo') userTo: Types.ObjectId,
		@CurrentUser('_id') userFrom: Types.ObjectId,
	) {
		return this.MessageService.getMessages(userFrom, userTo)
	}

	@Post()
	@Auth()
	@HttpCode(200)
	async createMessage(
		@CurrentUser('_id') userFrom: Types.ObjectId,
		@Body() dto: MessageDto,
	) {
		return this.MessageService.createMessage(userFrom, dto)
	}

	@Delete(':id')
	@Auth()
	async deleteMessage(@Param('id') id: Types.ObjectId) {
		return this.MessageService.deleteMessage(id)
	}
}
