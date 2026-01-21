import { FunctionComponent } from 'preact'

import { Factoid, FactoidType } from 'components/ui/factoid'

import './style.css'

type FactoidRowType = {
	countInRow: number
	factoids: FactoidType[]
}
export const FactoidRow: FunctionComponent<FactoidRowType> = ({ countInRow, factoids }) => (
	<div className="factoid-row" style={{ '--factoid-row': countInRow }}>
		{factoids.map(factoidProps => <Factoid {...factoidProps} />)}
	</div>
)