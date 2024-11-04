// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import './share.scss'
import { useCreatePost } from '@/tanstack-query/post/useCreatePost'
import { useUploadFile } from '@/tanstack-query/post/useUploadFile'

const Share = () => {
	const [file, setFile] = useState<File | null>(null)
	const [desc, setDesc] = useState('')
	const currentUser = useTypedSelector(state => state.auth.user)
	const dispatch = useDispatch()

	const { CreatePostMutation, isSuccess } = useCreatePost(currentUser?.id ?? '')
	const { mutate, data, isSuccess: uploadSuccess } = useUploadFile()

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!currentUser) return
		if (!file && !desc) return
		if (!file) {
			CreatePostMutation({ img: '', desc, authorId: currentUser.id })
			if (isSuccess) {
				setDesc('')
				setFile(null)
			}
		} else {
			const formData = new FormData()
			if (file) {
				console.log('File detected:', file) // Убедитесь, что файл существует
				formData.append('file', file) // Добавляем файл в FormData
			}
			mutate(formData, {
				onSuccess: data => {
					console.log('RESPONSE______________', data?.data)
					const postPicture = data?.data || ''
					CreatePostMutation({
						img: postPicture,
						desc,
						authorId: currentUser.id
					})

					if (isSuccess) {
						setDesc('')
						setFile(null)
					}
				},
				onError: () => {
					CreatePostMutation({ img: '', desc, authorId: currentUser.id })
				}
			})
		}
	}
	return (
		<div className='share'>
			<div className='container'>
				<div className='top'>
					<div className='left'>
						<img
							src={'/upload/' + currentUser?.profilePic}
							alt='profile picture'
						/>
						<input
							type='text'
							placeholder={`What's on your mind ${currentUser?.username}?`}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setDesc(e.target.value)
							}
							value={desc}
						/>
					</div>
					<div className='right'>
						{file && (
							<div className='container'>
								<img
									className='file'
									alt=''
									src={URL.createObjectURL(file)}
								/>
								<button
									className='remove_file'
									onClick={() => setFile(null)}
								>
									✖
								</button>
							</div>
						)}
					</div>
				</div>
				<hr />
				<div className='bottom'>
					<div className='left'>
						<input
							type='file'
							id='file'
							style={{ display: 'none' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0] || null
								setFile(file)
							}}
						/>
						<label htmlFor='file'>
							<div className='item'>
								<img
									src={''}
									alt=''
								/>
								<span>Add Image</span>
							</div>
						</label>
						<div className='item'>
							<img
								src={''}
								alt=''
							/>
							<span>Add Place</span>
						</div>
						<div className='item'>
							<img
								src={''}
								alt=''
							/>
							<span>Tag Friends</span>
						</div>
					</div>
					<div className='right'>
						<button onClick={handleClick}>Share</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Share
