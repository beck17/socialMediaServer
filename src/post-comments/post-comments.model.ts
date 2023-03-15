import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { PostModel } from '../post/post.model'
import { UserModel } from '../user/user.model'

export interface PostCommentsModel extends Base {}

export class PostCommentsModel extends TimeStamps {
	@prop()
	text: string

	@prop({ ref: () => PostModel })
	postId: Ref<PostModel>

	@prop({ ref: () => UserModel })
	userId: Ref<UserModel>
}
