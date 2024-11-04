import React, { forwardRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './fullScreenImage.scss'

interface FullscreenImageProps {
	src: string // URL изображения
	isShow: boolean
}

const FullscreenImage = forwardRef<HTMLDivElement, FullscreenImageProps>(
	({ src, isShow }, ref) => {
		useEffect(() => {
			if (isShow) {
				document.body.style.overflow = 'hidden' // Отключаем прокрутку
			} else {
				document.body.style.overflow = 'auto' // Включаем прокрутку обратно
			}

			// Возвращаемся к предыдущему состоянию при размонтировании
			return () => {
				document.body.style.overflow = 'auto' // Обеспечиваем, что прокрутка будет включена при размонтировании
			}
		}, [isShow])

		return ReactDOM.createPortal(
			<div className='fullscreen_overlay'>
				<div
					className='fullscreen_image_wrapper'
					ref={ref}
				>
					<img
						src={'/upload/' + src}
						alt='Fullscreen'
						className='fullscreen_image'
					/>
				</div>
			</div>,
			document.body
		)
	}
)

export default FullscreenImage
