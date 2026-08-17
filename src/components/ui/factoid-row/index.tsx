import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { Factoid, FactoidType } from 'components/ui/factoid'

import './style.css'

type FactoidRowType = {
	countInRow: number
	factoids: FactoidType[]
	mini?: boolean
}
export const FactoidRow: FunctionComponent<FactoidRowType> = ({ countInRow, factoids, mini }) => (
	<div
		className={cs('factoid-row', {
			'factoid-row--mini': mini
		})}
		style={{ '--grid-count': countInRow }}
	>
		{factoids.map(factoidProps => <Factoid {...factoidProps} />)}
	</div>
)
