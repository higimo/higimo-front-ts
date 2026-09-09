import { FunctionComponent } from 'preact'
import { TripSummary } from 'components/block-renderer/types'

import { FactoidRow } from 'components/ui/factoid-row'

export const TripSummaryRenderer: FunctionComponent<TripSummary> = ({
	counters
}) => (
	<FactoidRow
		countInRow={6}
		factoids={counters}
		mini
	/>
)
