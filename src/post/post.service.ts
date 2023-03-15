import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { PostModel } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { PostDto } from './post.dto'
import { Types } from 'mongoose'

@Injectable()
export class PostService {
	constructor(
		@InjectModel(PostModel)
		private readonly PostModel: ModelType<PostModel>,
	) {}

	async getAllPosts() {
		return this.PostModel.find().sort({ created_at: 'desc' }).exec()
	}

	async getPostByUserId(postId: Types.ObjectId) {
		return this.PostModel.findById(postId)
	}

	async createPost(userId: Types.ObjectId, dto: PostDto) {
		return this.PostModel.create({
			userId,
			text: dto.text,
			image: dto.image,
		})
	}

	async deletePostById(postId: Types.ObjectId) {
		const deletePost = await this.PostModel.findByIdAndDelete({ _id: postId })
		if (!deletePost) throw new NotFoundException('Пост не найден')
		return deletePost
	}

	async updatePost(postId: Types.ObjectId, dto: PostDto) {
		return this.PostModel.findByIdAndUpdate(postId, {
			text: dto.text,
			image: dto.image,
		})
	}
}
