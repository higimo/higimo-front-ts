import './style.css'

type SwitcherProps = {
	options: {
		title: string
		active: boolean
		onClick: () => void
	}[]
}

export const Switcher = ({ options }: SwitcherProps) => {
	return (
		<div className="switcher-container">
			{options.map((option) => (
				<button
					className={`switcher-button ${option.active ? 'active' : ''}`}
					onClick={option.onClick}
					type="button"
				>
					{option.title}
				</button>
			))}
		</div>
	)
}