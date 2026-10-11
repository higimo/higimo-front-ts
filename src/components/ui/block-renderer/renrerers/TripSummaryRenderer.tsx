import { FunctionComponent } from 'preact'
import { TripSummary } from 'components/ui/block-renderer/types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'

export const TripSummaryRenderer: FunctionComponent<TripSummary> = ({
	counters
}) => (
	<FactoidList
		countInRow={6}
		factoids={counters}
		mini
	/>
)
