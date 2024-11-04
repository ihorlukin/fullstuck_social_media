'use client'

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PinterestIcon from '@mui/icons-material/Pinterest'
import PlaceIcon from '@mui/icons-material/Place'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import FollowButton from '@/components/followButton/FolowButton'
import Posts from '@/components/posts/Posts'
import { Update } from '@/components/update/Update'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import './profile.scss'
import { useFindProfile } from '@/tanstack-query/profile/useFindProfile'

// import { setFollow, setUnfollow } from "../../store/authSlice";
const Profile = () => {
	const [openUpdate, setOpenUpdate] = useState(false)
	const currentUser = useTypedSelector(state => state.auth.user)
	const { id } = useParams()
	console.log(id)

	const { data: userById, refetch, isLoading } = useFindProfile(id)

	useEffect(() => {
		refetch()
	}, [id]) // eslint-disable react-hooks/exhaustive-deps

	console.log(userById)

	if (!userById) return <>Loading...</>

	return (
		<div className='profile'>
			{isLoading ? (
				'loading'
			) : (
				<>
					<div className='images'>
						<img
							src={'/upload/' + userById.coverPic}
							alt=''
							className='cover'
						/>
						<img
							src={'/upload/' + userById.profilePic}
							alt=''
							className='profilePic'
						/>
					</div>
					<div className='profileContainer'>
						<div className='uInfo'>
							<div className='left'>
								<a href='http://facebook.com'>
									<FacebookTwoToneIcon fontSize='large' />
								</a>
								<a href='http://facebook.com'>
									<InstagramIcon fontSize='large' />
								</a>
								<a href='http://facebook.com'>
									<TwitterIcon fontSize='large' />
								</a>
								<a href='http://facebook.com'>
									<LinkedInIcon fontSize='large' />
								</a>
								<a href='http://facebook.com'>
									<PinterestIcon fontSize='large' />
								</a>
							</div>
							<div className='center'>
								<span>{userById.username}</span>
								<div className='info'>
									<div className='item'>
										<PlaceIcon />
										<span>
											{userById.country}, {userById.city}
										</span>
										<span>
											followers{' '}
											{userById.followedBy ? userById.followedBy.length : 0}
										</span>
										<span>
											following{' '}
											{userById.following ? userById.following.length : 0}
										</span>
									</div>
									<div className='item'>
										<LanguageIcon />
										<a
											href={`${userById.website}`}
											target='_blank'
										>
											<span>{userById.website}</span>
										</a>
									</div>
								</div>
								{isLoading ? (
									'loading'
								) : userById.id === currentUser?.id ? (
									<button onClick={() => setOpenUpdate(true)}>update</button>
								) : (
									<FollowButton userById={userById} />
								)}
							</div>
							<div className='right'>
								<EmailOutlinedIcon />
								<MoreVertIcon />
							</div>
						</div>
						<Posts userId={userById.id} />
					</div>
				</>
			)}
			{openUpdate && currentUser && (
				<Update
					setOpenUpdate={setOpenUpdate}
					user={userById}
				/>
			)}
		</div>
	)
}

export default Profile
