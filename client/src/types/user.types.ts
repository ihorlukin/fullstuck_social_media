import { IBase } from './root.types'

export interface IUser extends IBase {
	email: string
	password: string
	username: string
	usertype: string
	type1: string
	type2: string
	country: string
	city: string
	website: string
	profilePic: string
	coverPic: string
	followedBy: Follows[]
	following: Follows[]
	likedPosts?: IPost[]
	posts?: IPost[]
	comments?: Comment[]
	messages: IMessage[]
	chats?: IChat[]
}
export interface IChat {
	id: string
	chatName: string
	users: IUser[]
	messages: IMessage[]
	latestMessage?: IMessage
	latestMessageId?: string
}

export interface IMessage extends IBase {
	sender: IUser
	senderId: string
	content: string
	chat: IChat
	chatId: string
	chatAsLatest?: string
}

export interface IPost extends IBase {
	desc: string
	img: string
	likes: IUser[]
	author: IUser
	authorId: string
	comments: IComment[] | null
}

export interface Follows {
	followedBy: IUser
	followedById: string
	following: IUser
	followingId: string
}

export interface IComment {
	id: string
	content: string
	createdAt: string
	postId: string
	post: IPost
	parentId: string | null // ID of the parent comment, if any
	parent: IComment | null
	children: IComment[] | null
	authorId: string
	author: IUser
}

export interface SearchQuery {
	type?: string
	city?: string
	country?: string
}

export interface IUnique {
	countries: string[]
	cities: string[]
}

export interface ISearchUsersByFiltersResponse {
	id: string
	profilePic: string
	username: string
	city: string
	followedBy: Follows[]
	following: Follows[]
}

export type TFollowings = Pick<IUser, 'id' | 'username' | 'profilePic'>
