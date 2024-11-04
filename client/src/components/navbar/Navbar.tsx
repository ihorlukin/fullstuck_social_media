'use client'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { setLogout, toggleMode } from '@/store/slices/authSlice'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { authService } from '../../services/auth.service'

import './navbar.scss'
import { ThemeContext } from '@/context/ThemeContext'

// import { getSender } from "../../utils/ChatLogic";
const Navbar = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('ThemeContext must be used within a ThemeContextProvider')
	}
	const { darkMode, toggle } = context
	const user = useTypedSelector(state => state.auth.user)
	const dispatch = useDispatch()
	const router = useRouter()
	const handleLogout = async () => {
		const res = await authService.logout()
		if (res.data) {
			dispatch(setLogout())
			router.replace('/auth/login')
		}
	}
	console.log(user)

	return (
		<div className='navbar'>
			<div className='left'>
				<Link
					href='/i'
					style={{ textDecoration: 'none' }}
				>
					<span>SEsocial</span>
				</Link>
				<HomeOutlinedIcon />
				{darkMode ? (
					<WbSunnyOutlinedIcon onClick={toggle} />
				) : (
					<DarkModeOutlinedIcon onClick={toggle} />
				)}
				<GridViewOutlinedIcon />
			</div>
			<div className='right'>
				<PersonOutlinedIcon />
				<button onClick={handleLogout}>Log out</button>
				<div className='user'>
					<img
						src={'/upload/' + user?.profilePic}
						alt=''
					/>
					<span>{user?.username}</span>
				</div>
			</div>
		</div>
	)
}

export default Navbar
