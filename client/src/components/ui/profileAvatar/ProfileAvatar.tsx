import { FC } from 'react'

import './profileAvatar.scss'

interface IProfileAvatar {
	username: string
	profilePic: string
}
export const ProfileAvatar: FC<IProfileAvatar> = ({ username, profilePic }) => {
	return (
		<div className='profileAvatar'>
			<img
				alt={`${username} profile picture`}
				src={'/upload/' + profilePic}
			/>
			<p>{username}</p>
		</div>
	)
}
