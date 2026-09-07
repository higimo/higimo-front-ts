import { FunctionComponent } from 'preact'
import { TripSymmary } from '../types'
import { FactoidRow } from 'components/ui/factoid-row'

export const TripSymmaryRenderer: FunctionComponent<TripSymmary> = ({
	counters
}) => (
	<FactoidRow
		countInRow={6}
		factoids={counters}
		mini
	/>
)
