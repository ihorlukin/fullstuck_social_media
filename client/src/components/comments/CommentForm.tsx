import React, { FC, useState } from 'react'

import { ICommentDto } from '@/types/comment.types'

import s from './comments.module.scss'

interface ICommentFormProps {
	loading?: boolean
	error?: Error | null
	onSubmit: ({}: ICommentDto) => void
	postId: string
	autoFocus?: boolean
	initialValue?: string
	parentId?: string
	setIsReplying: React.Dispatch<React.SetStateAction<boolean>>
}
export const CommentForm: FC<ICommentFormProps> = ({
	loading,
	error,
	onSubmit,
	postId,
	autoFocus = false,
	initialValue = '',
	parentId,
	setIsReplying
}) => {
	const [message, setMessage] = useState(initialValue)

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		let data: ICommentDto = {
			content: message,
			postId: postId
		}
		e.preventDefault()
		if (parentId) data.parentId = parentId
		onSubmit(data)
		setMessage('')
		setIsReplying(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={s.comment_form_row}>
				<textarea
					autoFocus={autoFocus}
					value={message}
					onChange={e => setMessage(e.target.value)}
					className={s.message_input}
				/>
				<button
					className={s.btn}
					type='submit'
					disabled={loading}
				>
					{loading ? 'Loading' : 'Post'}
				</button>
			</div>
			<div className={s.error}>{error?.message}</div>
		</form>
	)
}
