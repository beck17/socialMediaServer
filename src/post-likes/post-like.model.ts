import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { UserModel } from '../user/user.model'
import { PostModel } from '../post/post.model'

export interface PostLikeModel extends Base {}

export class PostLikeModel extends TimeStamps {
	@prop({ ref: () => PostModel })
	postId: Ref<PostModel>

	@prop({ ref: () => UserModel })
	userId: Ref<UserModel>
}
