import { FC, useState } from 'react'
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa'

import { IComment } from '@/types/user.types'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { CommentForm } from './CommentForm'
import CommentList from './CommentsList'
import { IconBtn } from './IconBtn'
import s from './comments.module.scss'
import { useCreateComment } from '@/tanstack-query/comment/useCreateComment'
import { useDeleteComment } from '@/tanstack-query/comment/useDeleteComment'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
	timeStyle: 'short'
})
interface ICommentProps {
	comment: IComment
	postId: string
	getReplies: (id: string) => IComment[]
}

export const Comment: FC<ICommentProps> = ({ comment, getReplies, postId }) => {
	const [areChildrenHidden, setAreChildrenHidden] = useState(true)
	const [isReplying, setIsReplying] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const currentUser = useTypedSelector(state => state.auth.user)
	const childComments = getReplies(comment.id)

	const {
		mutate,
		isPending: createPending,
		error: createPostError
	} = useCreateComment(postId)

	const { deleteComment, isPending, error } = useDeleteComment(
		postId,
		comment.id
	)

	return (
		<>
			<div className={s.comment}>
				<div className={s.header}>
					<span className={s.name}>{comment.author.username}</span>
					<span className={s.date}>
						{dateFormatter.format(Date.parse(comment.createdAt))}
					</span>
				</div>
				<div>{comment.content}</div>
				<div className={s.footer}>
					<IconBtn
						onClick={() => setIsReplying(prev => !prev)}
						isActive={isReplying}
						Icon={FaReply}
						aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
					/>
					{currentUser && comment.authorId === currentUser?.id && (
						<>
							<IconBtn
								disabled={isPending}
								onClick={deleteComment}
								Icon={FaTrash}
								aria-label='Delete'
								color='danger'
							/>
						</>
					)}
				</div>
				{error && (
					<div className={`${s.error_msg} ${s.mt1}`}>{error?.message}</div>
				)}
			</div>
			{isReplying && (
				<div className={`${s.ml3} ${s.mt1}`}>
					<CommentForm
						setIsReplying={setIsReplying}
						autoFocus={true}
						onSubmit={mutate}
						loading={createPending}
						error={createPostError}
						postId={postId}
						parentId={comment.id}
					/>
				</div>
			)}
			{childComments?.length > 0 && (
				<>
					<div
						className={`${s.nested_comments_stack} ${
							areChildrenHidden ? s.hide : ''
						}`}
					>
						<button
							className={s.collapse_line}
							aria-label='Hide Replies'
							onClick={() => setAreChildrenHidden(true)}
						/>
						<div className={s.nested_comments}>
							<CommentList
								comments={childComments}
								postId={postId}
								getReplies={getReplies}
							/>
						</div>
					</div>
					<button
						className={`${s.btn} ${s.mt1} ${!areChildrenHidden ? s.hide : ''}`}
						onClick={() => setAreChildrenHidden(false)}
					>
						Show Replies ({childComments.length})
					</button>
				</>
			)}
		</>
	)
}
