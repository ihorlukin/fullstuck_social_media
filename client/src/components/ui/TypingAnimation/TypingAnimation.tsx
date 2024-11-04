import React from 'react'

import './typingAnimation.scss'

const TypingAnimation = () => {
	return (
		<div className='chat-bubble'>
			<div className='typing'>
				<div className='dot'></div>
				<div className='dot'></div>
				<div className='dot'></div>
			</div>
		</div>
	)
}

export default TypingAnimation
