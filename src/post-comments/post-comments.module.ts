import { Module } from '@nestjs/common'
import { PostCommentsService } from './post-comments.service'
import { PostCommentsController } from './post-comments.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostCommentsModel } from './post-comments.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostCommentsModel,
				schemaOptions: { collection: 'post-comments' },
			},
		]),
	],
	controllers: [PostCommentsController],
	providers: [PostCommentsService],
})
export class PostCommentsModule {}
