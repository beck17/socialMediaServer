import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { PostLikeModel } from './post-like.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { PostLikeDto } from './post-like.dto'

@Injectable()
export class PostLikesService {
	constructor(
		@InjectModel(PostLikeModel)
		private readonly PostLikeModel: ModelType<PostLikeModel>,
	) {}

	async isExists(userId: Types.ObjectId, { postId }: PostLikeDto) {
		return this.PostLikeModel.exists({ user: userId, post: postId }).exec()
	}

	async createLike(userId: Types.ObjectId, { postId }: PostLikeDto) {
		// const checkLike = await this.PostLikeModel.findOne({
		// 	user: userId,
		// 	post: postId,
		// }).exec()
		// if (checkLike) throw new Error('')

		return this.PostLikeModel.create({
			user: userId,
			post: postId,
		})
	}

	async deleteLike(userId: Types.ObjectId, { postId }: PostLikeDto) {
		return this.PostLikeModel.findOneAndDelete({
			user: userId,
			post: postId,
		}).exec()
	}
}
