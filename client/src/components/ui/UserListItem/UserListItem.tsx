'use client'

import { Avatar } from '@chakra-ui/avatar'
import { Box, Text } from '@chakra-ui/layout'
import React, { FC, MouseEventHandler } from 'react'

import { IUser, TFollowings } from '@/types/user.types'

import { ProfileAvatar } from '../profileAvatar/ProfileAvatar'

import './userListItem.scss'

interface IUserListItemProps {
	handleFunction: (e: React.MouseEvent<HTMLDivElement>) => void
	username: string
	profilePic: string
}
const UserListItem: FC<IUserListItemProps> = ({
	handleFunction,
	username,
	profilePic
}) => {
	return (
		<div
			className='userListItem'
			onClick={handleFunction}
		>
			<ProfileAvatar
				username={username}
				profilePic={profilePic}
			/>
		</div>
	)
}

export default UserListItem
