import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Types } from 'mongoose'
import { PostCommentsModel } from './post-comments.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { PostCommentsDto } from './post-comments.dto'

@Injectable()
export class PostCommentsService {
	constructor(
		@InjectModel(PostCommentsModel)
		private readonly PostCommentsModel: ModelType<PostCommentsModel>,
	) {}

	async byPostId(postId: Types.ObjectId) {
		return this.PostCommentsModel.find({ postId }, '-__v')
			.sort({ crated_at: 'desc' })
			.populate('user', 'firstName lastName')
			.exec()
	}

	async create(userId: Types.ObjectId, dto: PostCommentsDto) {
		return this.PostCommentsModel.create({
			text: dto.text,
			postId: dto.postId,
			userId,
		})
	}

	async updateComment(postId: Types.ObjectId, dto: PostCommentsDto) {
		return this.PostCommentsModel.findByIdAndUpdate(postId, {
			text: dto.text,
		})
	}
}
