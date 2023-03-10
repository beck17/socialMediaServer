import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true, required: true })
	phoneNumber: number

	@prop({ required: true })
	firstName: string

	@prop({ required: true })
	lastName: string

	@prop({ required: true })
	password: string
}
