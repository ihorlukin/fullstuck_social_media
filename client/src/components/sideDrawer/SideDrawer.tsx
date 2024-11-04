'use client'

import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Spinner,
	Text,
	Toast,
	Tooltip,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdMotionPhotosAuto } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { IUser, TFollowings } from '@/types/user.types'

import { setSelectedChat } from '@/store/slices/authSlice'

import { useOutside } from '@/hooks/useOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import UserListItem from '../ui/UserListItem/UserListItem'

import { SearchUserForChat } from './SearchUser'
import { chatService } from '@/services/chat.service'
import { userService } from '@/services/user.service'
import { useCreateChat } from '@/tanstack-query/chat/useCreateChat'

const SideDrawer = () => {
	const dispatch = useDispatch()
	const currentUser = useTypedSelector(state => state.auth.user)
	const [search, setSearch] = useState('')
	const [following, setFollowing] = useState<IUser[] | []>([])
	const [filteredFollowing, setFilteredFollowing] = useState<
		TFollowings[] | []
	>([])
	const { ref, isShow, setIsShow } = useOutside(false)

	useEffect(() => {
		const fetchFollowings = async () => {
			if (!currentUser) return
			const { data } = await userService.getFollowing(currentUser?.id)
			console.log('SIDE DRAWER', data)
			setFollowing(data)
		}
		fetchFollowings()
	}, [])

	const handleFilter = () => {
		let data = [...following]
		if (search !== '') {
			const result = data.filter(p =>
				p.username.toLowerCase().includes(search.toLowerCase())
			)
			setFilteredFollowing(result)
		} else {
			setFilteredFollowing(data)
		}
	}

	useEffect(() => {
		handleFilter()
	}, [search, following])

	const queryClient = useQueryClient()
	const {
		mutate: createChat,
		data,
		isPending
	} = useMutation({
		mutationKey: ['create chat'],
		mutationFn: (id: string) => chatService.create(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['fetch chats', currentUser?.id]
			})
			dispatch(setSelectedChat(data?.data))
			setIsShow(false)
		}
	})

	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				bg='white'
				w='100%'
				p='5px 10px 5px 10px'
				borderWidth='5px'
			>
				<Button
					variant='ghost'
					onClick={() => setIsShow(true)}
				>
					<i className='fas fa-search'></i>
					<Text
						display={{ base: 'none', md: 'flex' }}
						px='4'
					>
						Search User
					</Text>
				</Button>
			</Box>
			<SearchUserForChat
				isVisible={isShow}
				ref={ref}
				filteredFollowing={filteredFollowing}
				setSearch={setSearch}
				search={search}
				loadingChat={isPending}
				createChat={createChat}
			/>
		</>
	)
}

export default SideDrawer
