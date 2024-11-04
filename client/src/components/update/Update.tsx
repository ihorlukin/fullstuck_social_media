import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { FC, useState } from 'react'

import { IUser } from '@/types/user.types'

import { RadioInput } from '../radioInput/RadioInput'

import './update.scss'
import { useUploadFile } from '@/tanstack-query/post/useUploadFile'
import { useUpdateProfile } from '@/tanstack-query/profile/useUpdateProfile'

interface UpdateProps {
	user: IUser
	setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const Update: FC<UpdateProps> = ({ setOpenUpdate, user }) => {
	const [cover, setCover] = useState<File | null>(null)
	const [profile, setProfile] = useState<File | null>(null)
	const [texts, setTexts] = useState({
		country: user.country || '',
		usertype: user.usertype || '',
		type1: user.type1 || '',
		city: user.city || '',
		website: user.website || ''
	})
	console.log(texts)
	const { mutate, data, isSuccess } = useUploadFile()
	const { mutate: updateProfile } = useUpdateProfile(user.id)
	console.log(user.id)
	const upload = async (file: File) => {
		console.log(file)

		const formData = new FormData()
		formData.append('file', file)
		mutate(formData)
		if (isSuccess) {
			return data?.data
		} else {
			return false
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value } = e.target
		setTexts(prev => ({
			...prev,
			[name]: type === 'radio' ? value : value.trim()
		}))
	}

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		let coverUrl: string
		let profileUrl: string
		coverUrl = cover ? await upload(cover) : user.coverPic
		profileUrl = profile ? await upload(profile) : user.profilePic
		console.log({ ...texts, coverPic: coverUrl, profilePic: profileUrl })
		updateProfile({ ...texts, coverPic: coverUrl, profilePic: profileUrl })
		setOpenUpdate(false)
		setCover(null)
		setProfile(null)
	}
	return (
		<div className='update'>
			<div className='wrapper'>
				<h1>Update Your Profile</h1>
				<form>
					<div className='files'>
						<label
							htmlFor='cover'
							className='label'
						>
							<span>Cover Picture</span>
							<div className='imgContainer'>
								<img
									src={
										cover
											? URL.createObjectURL(cover)
											: '/upload/' + user.coverPic
									}
									alt=''
								/>
								<CloudUploadIcon className='icon' />
							</div>
						</label>
						<input
							type='file'
							id='cover'
							style={{ display: 'none' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0] || null
								setCover(file)
							}}
						/>
						<label
							htmlFor='profile'
							className='label'
						>
							<span>Profile Picture</span>
							<div className='imgContainer'>
								<img
									src={
										profile
											? URL.createObjectURL(profile)
											: '/upload/' + user.profilePic
									}
									alt=''
								/>
								<CloudUploadIcon className='icon' />
							</div>
						</label>
						<input
							type='file'
							id='profile'
							style={{ display: 'none' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0] || null
								setProfile(file)
							}}
						/>
					</div>
					<label>
						<RadioInput
							label={'User'}
							state={texts}
							handleChange={handleChange}
							name={'usertype'}
							value={'user'}
						/>
						<RadioInput
							label={'Organisation'}
							state={texts}
							handleChange={handleChange}
							name={'usertype'}
							value={'organisation'}
						/>
						TYPE 1{' '}
					</label>
					<RadioInput
						label={'Education'}
						state={texts}
						handleChange={handleChange}
						name={'type1'}
						value={'education'}
					/>
					<RadioInput
						label={'Sport'}
						state={texts}
						handleChange={handleChange}
						name={'type1'}
						value={'sport'}
					/>
					<label className='label'>Country</label>
					<input
						type='text'
						name='country'
						value={texts.country}
						onChange={handleChange}
					/>
					<label className='label'>City</label>
					<input
						type='text'
						name='city'
						value={texts.city}
						onChange={handleChange}
					/>
					<label className='label'>Website</label>
					<input
						type='text'
						name='website'
						value={texts.website}
						onChange={handleChange}
					/>
					<button onClick={handleClick}>Update</button>
				</form>
				<button
					className='close'
					onClick={() => setOpenUpdate(false)}
				>
					close
				</button>
			</div>
		</div>
	)
}
