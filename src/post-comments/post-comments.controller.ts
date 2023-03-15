import { Controller, Get, Param } from '@nestjs/common'
import { PostCommentsService } from './post-comments.service'
import { Types } from 'mongoose'

@Controller('post-comments')
export class PostCommentsController {
	constructor(private readonly PostCommentsService: PostCommentsService) {}

	@Get('by-post/:postId')
	async getCommentsByPostId(@Param('postId') postId: Types.ObjectId) {
		return this.PostCommentsService.byPostId(postId)
	}

	// @UsePipes(new ValidationPipe())
	// @Post('post-comment')
	// @HttpCode(200)
	// async createComment(@Body() dto: PostCommentsDto) {
	// 	return this.PostCommentsService.create(userId, dto)
	// }
}
