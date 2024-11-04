'use client'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import Person from '@/components/person/Person'

import { IUnique } from '@/types/user.types'

import { usePeopleSearch } from '@/hooks/usePeopleSearch'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import './people.scss'
import { useSocket } from '@/context/WebsocketContext'
import { userService } from '@/services/user.service'

const People = () => {
	const { socket } = useSocket()
	const [values, setValues] = useState<IUnique[]>([])
	const currrentUser = useTypedSelector(state => state.auth.user)
	useEffect(() => {
		const fetchunigue = async () => {
			const data = await userService.getUniqueValues()
			setValues(data)
			console.log(data)
		}
		fetchunigue()
	}, [])

	const {
		handleChange,
		valuesType2,
		handleSearch,
		setSearch,
		search,
		filteredDataWithoutUser,
		inputs
	} = usePeopleSearch(currrentUser?.id)

	useEffect(() => {
		if (socket) {
			socket.on('user:online', userId => {
				console.log('ONLINEUSER', userId)
			})
		}
	}, [socket])
	return (
		<div className='people'>
			<h1>People</h1>
			<form>
				<div className='select_container'>
					<label>
						<span>Type</span>
						<select
							name='type'
							onChange={handleChange}
						>
							<option value=''> All</option>
							<option value='user'>User</option>
							<option value='organisation'>Organisation</option>
							<option value='trainer'>Trainer or Educator</option>
						</select>
					</label>
					<label>
						<span>Type 1</span>
						<select
							name='type1'
							onChange={handleChange}
						>
							<option value=''> All</option>
							<option value='sport'>Sport</option>
							<option value='education'>Education</option>
						</select>
					</label>
					<label>
						<h2>Type 2</h2>
						{/* <select
							name='type2'
							value={inputs.type2}
							onChange={handleChange}
						>
							<option value=''>All</option>
							{valuesType2 &&
								valuesType2.length > 0 &&
								valuesType2.map(val => (
									<option
										key={val}
										value={val}
									>
										{val}
									</option>
								))}
						</select> */}
					</label>
					<label>
						<h2>Country</h2>
						<select
							name='country'
							value={inputs.country}
							onChange={handleChange}
						>
							<option value=''>All</option>
							{values[0]?.cities
								.filter(val => val !== '')
								.map(val => (
									<option
										key={val}
										value={val}
									>
										{val}
									</option>
								))}
						</select>
					</label>
					<label>
						<h2>City</h2>
						<select
							name='city'
							value={inputs.city}
							onChange={handleChange}
						>
							<option value=''>All</option>
							{values[0]?.countries
								.filter(val => val !== '')
								.map(val => (
									<option
										key={val}
										value={val}
									>
										{val}
									</option>
								))}
						</select>
					</label>
				</div>
				<div className='input_container'>
					<input
						type='search'
						name='search'
						placeholder='Enter username...'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
					<button onClick={e => handleSearch(e)}>search</button>
				</div>
			</form>
			<div className='separator'></div>
			{filteredDataWithoutUser && filteredDataWithoutUser.length > 0
				? filteredDataWithoutUser.map(person => (
						<Person
							person={person}
							key={person.id}
						/>
					))
				: 'People didn`t find'}
		</div>
	)
}

export default People
