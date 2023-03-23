import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common'
import { PostLikesService } from './post-likes.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Types } from 'mongoose'
import { PostLikeDto } from './post-like.dto'

@Controller('post-likes')
export class PostLikesController {
	constructor(private readonly postLikesService: PostLikesService) {}

	@Auth()
	@Get()
	async checkExists(
		@CurrentUser('_id') userId: Types.ObjectId,
		@Body() dto: PostLikeDto,
	) {
		return this.postLikesService.isExists(userId, dto)
	}

	@Auth()
	@Post()
	@HttpCode(200)
	async createLike(
		@CurrentUser('_id') userId: Types.ObjectId,
		@Body() dto: PostLikeDto,
	) {
		return this.postLikesService.createLike(userId, dto)
	}

	@Auth()
	@Delete()
	async deleteLike(
		@CurrentUser('_id') userId: Types.ObjectId,
		@Body() dto: PostLikeDto,
	) {
		return this.postLikesService.deleteLike(userId, dto)
	}
}
