'use client'

import { SpinnerIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import React, { Dispatch, FC, SetStateAction, forwardRef } from 'react'

import { TFollowings } from '@/types/user.types'

import { useOutside } from '@/hooks/useOutside'

import UserListItem from '../ui/UserListItem/UserListItem'

import './searchUser.scss'

interface IProps {
	isVisible: boolean
	filteredFollowing: TFollowings[] | []
	setSearch: Dispatch<SetStateAction<string>>
	search: string
	loadingChat: boolean
	createChat: (id: string) => void
}
export const SearchUserForChat = forwardRef<HTMLDivElement, IProps>(
	(
		{
			isVisible,
			filteredFollowing,
			loadingChat,
			search,
			setSearch,
			createChat
		},
		ref
	) => {
		return (
			<motion.div
				className='searchUserForChat'
				ref={ref}
				initial={{ x: '-100%' }}
				animate={{ x: isVisible ? 0 : '-100%' }}
				transition={{ duration: 0.5 }}
			>
				<div className='title'>Find User</div>
				<input
					value={search}
					placeholder='Search by name'
					onChange={e => setSearch(e.target.value)}
				/>
				{filteredFollowing && filteredFollowing.length > 0 ? (
					filteredFollowing.map(user => (
						<UserListItem
							key={user.id}
							username={user.username}
							profilePic={user.profilePic}
							handleFunction={() => createChat(user.id)}
						/>
					))
				) : (
					<p>No users found.</p>
				)}
				{loadingChat && (
					<SpinnerIcon
						m='0 auto'
						display='flex'
					/>
				)}
			</motion.div>
		)
	}
)
