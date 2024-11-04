import { IPost } from "./user.types";

export interface IPostDto extends Pick<IPost, 'img' | 'authorId' | 'desc'> {}

export interface ILikePost {
  id: string,
  postAuthorId: string,
  isLiked: boolean
}