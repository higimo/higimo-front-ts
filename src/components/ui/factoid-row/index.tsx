import { FunctionComponent } from 'preact';

import './style.css'
import { Factoid, FactoidType } from '../factoid';

type FactoidRowType = {
	countInRow: number;
	factoids: FactoidType[];
}
export const FactoidRow: FunctionComponent<FactoidRowType> = ({ countInRow, factoids }) => (
	<div className="factoid-row" style={{ '--factoid-row': countInRow }}>
		{factoids.map(factoidProps => <Factoid {...factoidProps} />)}
	</div>
)