export interface ICommentDto{
  content: string,
  postId: string,
  parentId?: string | null
}