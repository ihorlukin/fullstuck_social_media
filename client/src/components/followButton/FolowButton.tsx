import React, { FC, useEffect, useState } from 'react'

import { ISearchUsersByFiltersResponse, IUser } from '@/types/user.types'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { useFindProfile } from '@/tanstack-query/profile/useFindProfile'
import { useFollow } from '@/tanstack-query/profile/useFollow'
import { isFollow } from '@/utils'

const FollowButton: FC<{ userById: ISearchUsersByFiltersResponse | IUser }> = ({
	userById
}) => {
	const currentUser = useTypedSelector(state => state.auth.user)

	const { data, refetch } = useFindProfile(userById.id)
	const [isFriend, setIsFriend] = useState<boolean>(false)

	useEffect(() => {
		if (currentUser && data) {
			setIsFriend(isFollow(currentUser, data.following))
		}
	}, [currentUser, data])

	const { toggleFollow } = useFollow(isFriend, userById.id)

	const handleToggleFollow = async () => {
		toggleFollow()
		setIsFriend(prevIsFriend => !prevIsFriend)
	}

	return (
		<button onClick={handleToggleFollow}>
			{isFriend ? 'Unfollow' : 'Follow'}
		</button>
	)
}

export default FollowButton
