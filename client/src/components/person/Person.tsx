import { Text } from '@chakra-ui/layout'
import { Avatar, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { ISearchUsersByFiltersResponse, IUser } from '@/types/user.types'

import FollowButton from '../followButton/FolowButton'

import './person.scss'

const Person: FC<{ person: ISearchUsersByFiltersResponse | IUser }> = ({
	person
}) => {
	const router = useRouter()
	return (
		<div
			className='person'
			onClick={() => router.push(`/i/profile/${person.id}`)}
		>
			<div className='information'>
				<img
					alt='Profile picture'
					src={'/upload/' + person.profilePic}
				/>
				<p>{person.username}</p>
			</div>
			<FollowButton userById={person} />
		</div>
	)
}

export default Person
