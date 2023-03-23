import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { PostCommentsService } from './post-comments.service'
import { Types } from 'mongoose'
import { Auth } from '../auth/decorators/auth.decorator'
import { PostCommentsDto } from './dto/post-comments.dto'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UpdatePostCommentsDto } from './dto/update-post-comments.dto'

@Controller('post-comment')
export class PostCommentsController {
	constructor(private readonly PostCommentsService: PostCommentsService) {}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Get(':postId')
	async getCommentsByPostId(@Param('postId') postId: Types.ObjectId) {
		return this.PostCommentsService.getCommentsByPostId(postId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async createComment(
		@CurrentUser('_id') userId: Types.ObjectId,
		@Body() dto: PostCommentsDto,
	) {
		return this.PostCommentsService.createComment(userId, dto)
	}

	@Put(':commentId')
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async updateComment(
		@Param('commentId') commentId: Types.ObjectId,
		@Body() dto: UpdatePostCommentsDto,
	) {
		return this.PostCommentsService.updateComment(commentId, dto)
	}

	@Delete(':commentId')
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async deleteComment(@Param('commentId') commentId: Types.ObjectId) {
		return this.PostCommentsService.deleteComment(commentId)
	}
}
