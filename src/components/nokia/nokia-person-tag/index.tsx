import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import './style.css'

type PersonTagProps = ClassNameType & {
	person: NokiaPersonSimpleType
	onClick?: () => void
	onRemove?: () => void
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
					if (onClick) {
						onClick()
					}
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
