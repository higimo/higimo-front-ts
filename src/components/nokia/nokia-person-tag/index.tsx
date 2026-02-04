import { FunctionComponent } from 'preact'
import { NokiaPersonApiType } from 'types'

import './style.css'

interface PersonTagProps {
	person: NokiaPersonApiType
	onClick?: () => void
	onRemove?: () => void
	className?: string
}

export const NokiaPersonTag: FunctionComponent<PersonTagProps> = ({
	person,
	onClick,
	onRemove,
	className = ''
}) => {
	const displayName = person.nick || person.alias || person.name

	return (
		<div className={`person-tag ${className}`}>
			<span
				className="person-tag__name"
				onClick={(event) => {
					event.stopPropagation()
					onClick()
				}}
			>
				{displayName}
			</span>
			{onRemove && (
				<button
					type="button"
					className="person-tag__remove"
					onClick={(event) => {
						event.stopPropagation()
						onRemove()
					}}
					aria-label={`Удалить ${displayName}`}
				>
					×
				</button>
			)}
		</div>
	)
}
