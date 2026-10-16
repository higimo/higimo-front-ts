import { FactoidType } from 'types'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { Factoid } from 'components/ui/factoid'

import './style.css'

type FactoidListPropsType = {
	countInRow: number
	factoids: FactoidType[]
	mini?: boolean
}
export const FactoidList: FunctionComponent<FactoidListPropsType> = ({ countInRow, factoids, mini }) => (
	<div
		className={cs('factoid-row', {
			'factoid-row--mini': mini
		})}
		style={{ '--grid-count': countInRow }}
	>
		{factoids.map(factoidProps => (
			<Factoid key={factoidProps.description} {...factoidProps} />
		))}
	</div>
)
