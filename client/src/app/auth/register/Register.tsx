'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'

import { PAGES } from '@/constants/constants'

import { IRegisterForm } from '@/types/auth.types'

import './register.scss'
import { authService } from '@/services/auth.service'

const Register = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset
	} = useForm<IRegisterForm>({
		mode: 'onChange'
	})

	const { mutate, data } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IRegisterForm) => authService.main('register', data),
		onSuccess() {
			//toast.success('Successfully login!')
			reset()
			router.replace(PAGES.LOGIN)
		},
		onError(error) {
			setError('root', {
				type: 'server',
				message: error.message
			})
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		mutate(data)
	}
	return (
		<div className='register'>
			<div className='card'>
				<div className='left'>
					<h1>Lama Social.</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
						alias totam numquam ipsa exercitationem dignissimos, error nam,
						consequatur.
					</p>
					<span>Do you have an account?</span>
					<Link href={'./login'}>
						<button>Login</button>
					</Link>
				</div>
				<div className='right'>
					<h1>Register</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register('username', { required: true })}
							type='text'
							placeholder='Username'
							aria-invalid={errors.username ? 'true' : 'false'}
						/>
						{errors.username?.type === 'required' && (
							<p role='alert'>Username is required</p>
						)}

						<input
							{...register('email', { required: true })}
							type='email'
							placeholder='Email'
							aria-invalid={errors.email ? 'true' : 'false'}
						/>
						{errors.email?.type === 'required' && (
							<p role='alert'>Email is required</p>
						)}

						<input
							{...register('password', { required: true })}
							type='password'
							placeholder='Password'
							aria-invalid={errors.password ? 'true' : 'false'}
						/>
						{errors.password?.type === 'required' && (
							<p role='alert'>Password is required</p>
						)}

						<label>
							<input
								{...register('usertype')}
								type='radio'
								value='user'
							/>
							User
						</label>
						<label>
							<input
								{...register('usertype')}
								type='radio'
								value='organisation'
							/>
							Organisation
						</label>
						<label>
							<input
								{...register('usertype')}
								type='radio'
								value='coach'
							/>
							Trainer or Educator
						</label>
						<button type='submit'>Register</button>
						{errors.root && <p role='alert'>{errors.root.message}</p>}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
