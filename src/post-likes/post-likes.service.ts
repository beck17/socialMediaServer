import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { PostLikeModel } from './post-like.model'
import { ModelType } from '@typegoose/typegoose/lib/types'

@Injectable()
export class PostLikesService {
	constructor(
		@InjectModel(PostLikeModel)
		private readonly PostLikeModel: ModelType<PostLikeModel>,
	) {}
}
