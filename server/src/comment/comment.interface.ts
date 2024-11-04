export interface CommentCreationDto{
  content: string,
  postId: string,
  parentId?: string | null
}