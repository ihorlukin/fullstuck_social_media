import { FC, ReactElement } from 'react'

import s from './radioInput.module.scss'

interface IRadioInputProps {
	label: string
	name: string
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	state: { [key: string]: any }
	value: string
}
export const RadioInput: FC<IRadioInputProps> = ({
	label,
	name,
	handleChange,
	state,
	value
}): ReactElement => {
	return (
		<label className={s.label_radio}>
			<input
				className={s.input}
				type='radio'
				name={name}
				value={value}
				checked={state[name] === value}
				onChange={handleChange}
			/>
			{label}
		</label>
	)
}
