import { FunctionComponent } from 'preact'

export type FactoidType = {
	digit: number | string
	digitFrom?: string
	description: string
}
export const Factoid: FunctionComponent<FactoidType> = ({ digit, digitFrom, description }) => {
	return (
		<div className="factoid">
			<div className="factoid__digit">
				<div className="factoid__digit-counter">{digit}</div>
				<div className="factoid__digit-dimension">{digitFrom}</div>
			</div>
			<div className="factoid__description">{description}</div>
		</div>
	)
}
