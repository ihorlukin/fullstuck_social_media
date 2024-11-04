import { FC } from 'react'

import { IComment } from '@/types/user.types'

import { Comment } from './Comment'
import s from './comments.module.scss'

interface ICommentListProps {
	comments: IComment[]
	postId: string
	getReplies: (id: string) => IComment[]
}
const CommentList: FC<ICommentListProps> = ({
	comments,
	getReplies,
	postId
}) => {
	return (
		<div>
			{comments.map(comment => (
				<div
					key={comment.id}
					className={s.comments_stack}
				>
					<Comment
						comment={comment}
						getReplies={getReplies}
						postId={postId}
					/>
				</div>
			))}
		</div>
	)
}

export default CommentList
