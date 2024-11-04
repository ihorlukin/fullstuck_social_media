'use client'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import Posts from '../posts/Posts'
import Share from '../share/Share'

import s from './home.module.scss'

const Home = () => {
	const user = useTypedSelector(state => state.auth.user)
	console.log(user)
	return (
		<div className={s.home}>
			<Share />
			{user && <Posts userId={user.id} />}
		</div>
	)
}

export default Home
