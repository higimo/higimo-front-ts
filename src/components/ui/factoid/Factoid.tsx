import { FactoidType } from 'types'
import { h, FunctionComponent } from 'preact'

export const Factoid: FunctionComponent<FactoidType> = ({ digit, digitFrom, description, href }) => {
	return h(
		!!href ? 'a' : 'div',
		{
			className: 'factoid',
			...(!!href ? { href } : {})
		},
		<>
			<div className="factoid__digit">
				<div className="factoid__digit-counter">{digit}</div>
				<div className="factoid__digit-dimension">{digitFrom}</div>
			</div>
			<div className="factoid__description">{description}</div>
		</>
	)
}
