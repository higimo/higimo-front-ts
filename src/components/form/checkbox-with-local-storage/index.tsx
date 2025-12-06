import { FunctionComponent } from 'preact'

import { useState } from 'preact/hooks'

import './style.css'

interface CheckboxWithLocalStorageProps {
	text: string
}

export const CheckboxWithLocalStorage: FunctionComponent<CheckboxWithLocalStorageProps> = ({ text }) => {
	const [checked, setChecked] = useState<boolean>(() => {
		const storedValue = localStorage.getItem(text)
		return storedValue === 'true'
	})
	
	const handleClick = (): void => {
		const newValue = !checked
		setChecked(newValue)
		localStorage.setItem(text, String(newValue))
	}
	
	return (
		<span className="smart-checkbox" onClick={handleClick}>
			<input 
				className="smart-checkbox__input" 
				type="checkbox" 
				checked={checked} 
				readOnly 
			/>
			<label className="smart-checkbox__label">
				{text}
			</label>
		</span>
	)
}