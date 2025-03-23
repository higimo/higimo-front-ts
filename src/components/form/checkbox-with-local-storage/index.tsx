import './style.css'

const toogleLocalStorage = text => () => {
	if (localStorage.getItem(text) === 'false') {
		localStorage.setItem(text, 'true')
	} else {
		localStorage.setItem(text, 'false')
	}
}

export const CheckboxWithLocalStorage = ({ text }) => {
	return (
		<span className="smart-checkbox" onClick={toogleLocalStorage(text)}>
			<input
				className="smart-checkbox__input"
				id={text}
				type="checkbox"
				checked={localStorage.getItem(text) === 'true'}
			/>
			<label
				className="smart-checkbox__label"
				for={text}
			>
				{text}
			</label>
		</span>
	)
}
