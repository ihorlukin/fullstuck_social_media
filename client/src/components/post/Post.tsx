import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { IComment, IPost } from '@/types/user.types'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { CommentForm } from '../comments/CommentForm'
import CommentList from '../comments/CommentsList'
import { ImageWithFull } from '../comments/fullScreenPhoto/ImageWithFull'

import './post.scss'
import { useCreateComment } from '@/tanstack-query/comment/useCreateComment'
import { useGetComments } from '@/tanstack-query/comment/useGetComments'
import { useDeletePost } from '@/tanstack-query/post/useDeletePost'
import { useLikePost } from '@/tanstack-query/post/useLikePost'

interface IPostProps {
	post: IPost
}
interface GroupedComments {
	[key: string]: any[]
}

const Post: FC<IPostProps> = ({ post }) => {
	const dispatch = useDispatch()
	const currentUser = useTypedSelector(state => state.auth.user)
	const isLiked = post.likes.some(user => user.id === currentUser?.id)
	const [menuOpen, setMenuOpen] = useState(false)
	const [isReplying, setIsReplying] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(null)
	const likeCount = post.likes.length
	const [comments, setComments] = useState<IComment[] | []>([])
	console.log(comments)
	const { mutate, isPending, error } = useCreateComment(post.id)

	const { data: commentsData, isSuccess, refetch } = useGetComments(post.id)
	useEffect(() => {
		if (isSuccess && commentsData) {
			setComments(commentsData)
		}
	}, [commentsData, isSuccess])

	// const commentsByParentId = useMemo(() => {
	// 	const group: GroupedComments = {}
	// 	if (comments.length === 0) return group
	// 	comments.forEach(comment => {
	// 		const parentId = comment.parentId ?? 'root'
	// 		console.log('PARENT ID', parentId)
	// 		group[parentId] ||= []
	// 		group[parentId].push(comment)
	// 	})
	// 	return group
	// }, [comments])// Используем useMemo для группировки комментариев по parentId

	// Получение корневых комментариев из сгруппированных данных
	const rootComments =
		comments.filter(comment => comment.parentId == null) ?? []

	function getReplies(parentId: string) {
		return comments.filter(comment => comment.parentId === parentId)
	}

	const { toggleLike } = useLikePost({
		id: post.id,
		postAuthorId: post.authorId,
		isLiked
	})

	const { deletePostMutation } = useDeletePost(post)

	return (
		<div className='post'>
			<div className='container'>
				<div className='user'>
					<div className='userInfo'>
						<img
							src={'/upload/' + post.author?.profilePic}
							alt=''
						/>
						<div className='details'>
							<Link
								href={`/profile/${post.authorId}`}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<span className='name'>{post.author.username}</span>
							</Link>
							<span className='date'>{moment(post.createdAt).fromNow()}</span>
						</div>
					</div>
					<MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
					{menuOpen && post.authorId === currentUser?.id && (
						<button onClick={() => deletePostMutation()}>delete</button>
					)}
				</div>
				<div className='content'>
					<p>{post.desc}</p>
					<ImageWithFull post={post} />
				</div>
				<div className='info'>
					<div className='item'>
						{isLiked ? (
							<FavoriteOutlinedIcon
								style={{ color: 'red' }}
								onClick={() => toggleLike()}
							/>
						) : (
							<FavoriteBorderOutlinedIcon onClick={() => toggleLike()} />
						)}
						{likeCount} Likes
						<button onClick={() => setIsReplying(prev => !prev)}>
							write Comment({comments.length})
						</button>
					</div>
				</div>
				{isReplying && (
					<section>
						<CommentForm
							setIsReplying={setIsReplying}
							loading={isPending}
							error={error}
							onSubmit={mutate}
							postId={post.id}
						/>
						{rootComments != null && rootComments.length > 0 && (
							<div style={{ marginTop: '1rem' }}>
								<CommentList
									comments={rootComments}
									getReplies={getReplies}
									postId={post.id}
								/>
							</div>
						)}
					</section>
				)}
			</div>
		</div>
	)
}

export default Post
