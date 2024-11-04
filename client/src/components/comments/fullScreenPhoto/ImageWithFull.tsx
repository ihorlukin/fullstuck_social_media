import { FC } from 'react'

import { IPost } from '@/types/user.types'

import { useOutside } from '@/hooks/useOutside'

import FullscreenImage from './FullScreenPhoto'

interface props {
	post: IPost
}
export const ImageWithFull: FC<props> = ({ post }) => {
	const { ref, isShow, setIsShow } = useOutside(false)
	return (
		<>
			<img
				onClick={() => setIsShow(true)}
				src={'/upload/' + post.img}
				alt=''
			/>
			{isShow && (
				<FullscreenImage
					src={post.img}
					ref={ref}
					isShow={isShow}
				/>
			)}
		</>
	)
}
