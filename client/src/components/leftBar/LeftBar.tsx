'use client'

import Link from 'next/link'
import { FaUserFriends } from 'react-icons/fa'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import { MdPersonSearch } from 'react-icons/md'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import './leftBar.scss'

const LeftBar = () => {
	const currentUser = useTypedSelector(state => state.auth.user)

	return (
		<div className='leftBar'>
			<div className='container'>
				<div className='menu'>
					<div className='user'>
						<Link href={`/i/profile/${currentUser?.id}`}>
							<div className='icon_placeholder'>
								<img
									src={`/upload/${currentUser?.profilePic}`}
									alt='profile'
								/>
							</div>
							<span className='text-placeholder'>{currentUser?.username}</span>
						</Link>
					</div>
					<Link
						href={'/i/friends'}
						className='item'
					>
						<div className='icon_placeholder'>
							<FaUserFriends />
						</div>
						<span className='text-placeholder'>Friends</span>
					</Link>
					<Link
						href={'/i/people'}
						className='item'
					>
						<div className='icon_placeholder'>
							<MdPersonSearch />
						</div>
						<span className='text-placeholder'>Search</span>
					</Link>
					<Link
						href={'/i/chat'}
						className='item'
					>
						<div className='icon_placeholder'>
							<IoChatbubbleEllipsesSharp />
						</div>
						<div className='text-placeholder'>Chat</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default LeftBar
