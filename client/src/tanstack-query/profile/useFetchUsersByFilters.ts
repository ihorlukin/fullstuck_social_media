import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { IValueForType2 } from '@/types/root.types'

import { userService } from '@/services/user.service'

interface IFilters {
	type: string
	type1: string
	country: string
	city: string
	type2: string
}

interface IData {
	inputs: IFilters
	trigger: boolean
}
export const useFetchUsersByFilters = ({ inputs, trigger }: IData) => {
	const { data, isSuccess, isPending } = useQuery({
		queryKey: ['fetch users by filters', inputs],
		queryFn: () => userService.getUsersByFilters(inputs),
		enabled: trigger // Запрос выполнится только если isEnabled === true
	})

	return { data, isSuccess, isPending }
}

export const useGetValueForType2 = (values: IValueForType2) => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['fetch value for type2'],
		queryFn: () => userService.getValueForType2(values)
	})

	return { data, isLoading, isSuccess }
}

export const useUniqueValues = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get unique'],
		queryFn: () => userService.getUniqueValues()
	})

	return { data, isLoading, isSuccess }
}
