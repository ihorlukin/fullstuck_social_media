'use client'

import React, { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'

import { IUser } from '@/types/user.types'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import Person from '../../../components/person/Person'

import './friends.scss'
import { userService } from '@/services/user.service'

type TDisplayType = 'following' | 'followers'
export const Friends = () => {
	const [displayType, setDisplayType] = useState<TDisplayType>('following')
	const { user } = useTypedSelector(state => state.auth)
	const [search, setSearch] = useState<string>('')
	const [following, setFollowing] = useState<IUser[]>([])
	const [followers, setFollowers] = useState<IUser[]>([])

	// const [filteredValues, setFilteredValues] = useState<IUser[]>([])

	const renderCount = useRef(0)

	// Увеличиваем счетчик при каждом рендере
	renderCount.current += 1
	console.log(renderCount)

	// const fetchFollowers = async () => {
	// 	console.log('Request_followers')
	// 	if (!user) return
	// 	const res = await userService.getFollowers(user.id)
	// 	setFollow(res.data)
	// }

	const fetch = async () => {
		if (!user?.id) return
		const [followingRes, followersRes] = await Promise.all([
			userService.getFollowing(user.id),
			userService.getFollowers(user.id)
		])
		setFollowing(followingRes.data)
		console.log(followingRes.data)
		setFollowers(followersRes.data)
	}

	useEffect(() => {
		if (user?.id) {
			fetch()
		}
		// Выполняем запросы, если пользователь есть
	}, [])

	const filteredValues = useMemo(() => {
		const data = displayType === 'following' ? following : followers

		if (!search.trim()) {
			return data
		} else {
			return following.filter(p =>
				p.username.toLowerCase().includes(search.toLowerCase())
			)
		}
	}, [search, following, followers, displayType])
	console.log(
		'filteredValues',
		filteredValues.map(f => f)
	)
	console.log('followers', followers)

	return (
		<div className='friends'>
			<h1>Friends</h1>
			<div className='followers'>
				<button onClick={() => setDisplayType('followers')}>Followers</button>
				<button onClick={() => setDisplayType('following')}>Following</button>
			</div>
			<input
				type='search'
				placeholder='Search...'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<div className='friendList'>
				{filteredValues && filteredValues.length > 0
					? filteredValues.map(f => (
							<Person
								person={f}
								key={f.id}
							/>
						))
					: 'Friends didn`t find'}
			</div>
		</div>
	)
}
