import React, { FC } from 'react'
import { IconType } from 'react-icons'

import s from './comments.module.scss'

interface IIconBtnProps {
	Icon: IconType
	isActive?: boolean
	color?: string
	children?: React.ReactNode
	disabled?: boolean
	onClick?: (...props: any) => void
}

export const IconBtn: FC<IIconBtnProps> = ({
	Icon,
	isActive,
	color,
	children,
	...props
}) => {
	return (
		<button
			className={`${s.btm} ${s.icon_btn} ${isActive ? s.icon_btn_active : ''} ${
				color || ''
			}`}
			{...props}
		>
			<span className={`${children != null ? s.mr1 : ''}`}>
				<Icon />
			</span>
			{children}
		</button>
	)
}
