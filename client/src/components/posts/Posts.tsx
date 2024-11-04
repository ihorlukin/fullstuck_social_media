import { FC, useEffect } from 'react'

import Post from '../post/Post'

import s from './posts.module.scss'
import { useFindPosts } from '@/tanstack-query/post/useFindPosts'

interface IPostProps {
	userId: string
}
const Posts: FC<IPostProps> = ({ userId }) => {
	const {
		data: posts,
		isLoading,
		error,
		isSuccess,
		refetch
	} = useFindPosts(userId)

	useEffect(() => {
		refetch()
	}, [userId])

	return (
		<div className={s.posts}>
			{error ? (
				'Something goes wrong'
			) : isLoading ? (
				'loading'
			) : isSuccess && posts && posts.length > 0 ? (
				posts.map(post => (
					<Post
						post={post}
						key={post.id}
					/>
				))
			) : (
				<h2 style={{ textAlign: 'center' }}>1</h2>
			)}
		</div>
	)
}

export default Posts
