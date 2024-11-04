'use client'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { dataTagSymbol, useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { ILoginForm } from '@/types/auth.types'

import { setLogin } from '@/store/slices/authSlice'

import './login.scss'
import { useSocket } from '@/context/WebsocketContext'
import { authService } from '@/services/auth.service'

const Login = () => {
	const { socket, initializeSocket, closeSocket } = useSocket()
	const dispatch = useDispatch()
	const [showPassword, setShowPassword] = useState(false)
	const handleTogglePassword = () => {
		setShowPassword(prevShowPassword => !prevShowPassword)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset
	} = useForm<ILoginForm>({
		mode: 'onChange'
	})

	const router = useRouter()

	const { mutate, data } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginForm) => authService.main('login', data),
		onSuccess(data) {
			console.log('LOGIN_____________', data)
			dispatch(setLogin(data.user)) // Передайте правильные данные в `dispatch`
			reset()
			router.replace('/i')
		},
		onError(error) {
			console.log(error)
			setError('root', {
				type: 'server',
				message: error.message
			})
		}
	})

	useEffect(() => {
		if (data?.user) {
			initializeSocket(data.user.id)
		}

		return () => {
			closeSocket()
		}
	}, [data?.user.id])

	const onSubmit: SubmitHandler<ILoginForm> = data => {
		mutate(data)
	}

	return (
		<>
			<div className='login'>
				<div className='card'>
					<div className='left'>
						<h1>Hello World.</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
							cum, alias totam numquam ipsa exercitationem dignissimos, error
							nam, consequatur.
						</p>
						<span>Don't you have an account?</span>
						<Link href={'./register'}>
							<button>Register</button>
						</Link>
					</div>
					<div className='right'>
						<h1>Login</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								{...register('email', { required: true })}
								type='email'
								placeholder='Email'
								aria-invalid={errors.email ? 'true' : 'false'}
							/>
							{errors.email?.type === 'required' && (
								<p
									className='error_message'
									role='alert'
								>
									Email is required
								</p>
							)}
							<div className='password_conteiner'>
								<input
									{...register('password', { required: true })}
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
								/>
								<div
									className='icon'
									onClick={handleTogglePassword}
								>
									{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</div>
							</div>
							<div style={{ height: '10px' }}>
								{errors.password?.type === 'required' && (
									<p role='alert'>Password is required</p>
								)}
							</div>
							<button type='submit'>Login</button>
							{errors.root?.message && (
								<p role='alert'>{errors.root.message}</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
