'use client'

import { Avatar, Tooltip } from '@chakra-ui/react'
import React, { FC } from 'react'
import ScrollableFeed from 'react-scrollable-feed'

import { IMessage } from '@/types/user.types'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import {
	formatDateTime,
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
	isSameUser,
	shouldDisplayDate
} from '../../utils'
import { ProfileAvatar } from '../ui/profileAvatar/ProfileAvatar'

const ScrollableChat: FC<{ messages: IMessage[] }> = ({ messages }) => {
	const { user } = useTypedSelector(state => state.auth)
	return (
		<ScrollableFeed>
			{messages &&
				messages.length > 0 &&
				messages.map((m, i) => (
					<React.Fragment key={m.id}>
						<div>
							{shouldDisplayDate(m.createdAt) && (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										marginTop: '10px'
									}}
								>
									{formatDateTime(m.createdAt)}
								</div>
							)}
						</div>
						<div
							style={{ display: 'flex' }}
							key={m.id}
						>
							{(isSameSender(messages, m, i, user?.id) ||
								isLastMessage(messages, i, user?.id)) && (
								<Tooltip
									label={m.sender.username}
									placement='bottom-start'
									hasArrow
								>
									<ProfileAvatar
										username={m.sender.username}
										profilePic={m.sender.profilePic}
									/>
								</Tooltip>
							)}
							<span
								style={{
									backgroundColor: `${m.senderId === user?.id ? '#BEE3F8' : '#B9F5D0'}`,
									borderRadius: '20px',
									padding: '5px 15px',
									maxWidth: '75%',
									marginLeft: isSameSenderMargin(messages, m, i, user?.id),
									marginTop: isSameUser(messages, m, i) ? 3 : 10
								}}
							>
								{m.content}
							</span>
						</div>
					</React.Fragment>
				))}
		</ScrollableFeed>
	)
}

export default ScrollableChat
