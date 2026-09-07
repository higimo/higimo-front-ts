import { FunctionComponent } from 'preact'
import { TripSymmary } from 'components/block-renderer/types'

import { FactoidRow } from 'components/ui/factoid-row'

export const TripSummaryRenderer: FunctionComponent<TripSymmary> = ({
	counters
}) => (
	<FactoidRow
		countInRow={6}
		factoids={counters}
		mini
	/>
)
