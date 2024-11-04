import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'

import { ISearchUsersByFiltersResponse, IUser } from '@/types/user.types'

import { userService } from '@/services/user.service'

interface IInputs {
	type: string
	type1: string
	country: string
	city: string
	type2: string
}

export const usePeopleSearch = (currentUser: string = '') => {
	const [filteredValues, setFilteredValues] = useState<
		ISearchUsersByFiltersResponse[]
	>([])
	const [valuesType2, setValuesType2] = useState<string[]>([])
	const [base, setBase] = useState<ISearchUsersByFiltersResponse[]>([])
	const [search, setSearch] = useState('')
	const [inputs, setInputs] = useState<IInputs>({
		type: '',
		type1: '',
		country: '',
		city: '',
		type2: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, type, value } = e.target
		setInputs(prev => ({
			...prev,
			[name]: type === 'radio' ? value : value.trim()
		}))
	}

	useEffect(() => {
		console.log(inputs.type)
		let DataToSend = {
			userType: inputs.type,
			userType1: inputs.type1
		}

		const FetchSearch1 = async () => {
			const data = await userService.getValueForType2(DataToSend) //+
			setValuesType2(data)
			console.log(data)
		}

		FetchSearch1()
	}, [inputs.type, inputs.type1])

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		const res = await userService.getUsersByFilters(inputs)
		setBase(res.data)
		setFilteredValues(res.data)
	}

	useEffect(() => {
		if (base.length > 0) {
			const filtered = base.filter(p =>
				p.username.toLowerCase().includes(search.toLowerCase())
			)
			setFilteredValues(filtered)
		}
	}, [search, base])
	const filteredDataWithoutUser = filteredValues.filter(
		data => data.id !== currentUser
	)
	return {
		handleChange,
		handleSearch,
		inputs,
		valuesType2,
		setSearch,
		search,
		filteredDataWithoutUser
	}
}
