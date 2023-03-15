import { Module } from '@nestjs/common'
import { PostLikesService } from './post-likes.service'
import { PostLikesController } from './post-likes.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostLikeModel } from './post-like.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostLikeModel,
				schemaOptions: { collection: 'post-likes' },
			},
		]),
	],
	controllers: [PostLikesController],
	providers: [PostLikesService],
})
export class PostLikesModule {}
