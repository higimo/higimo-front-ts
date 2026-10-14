import { cityTypes, subjectPederationTypes } from 'api-types/tourism.types'
import { FunctionComponent } from 'preact'
import { PoiType } from 'api-types/tourism.types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'

type TourismStatisticRussiaPropsType = {
	total: PoiType[]
}

export const TourismStatisticRussia: FunctionComponent<TourismStatisticRussiaPropsType> = ({ total }) => {
	const russianPoi = total.filter(item => item.country === 'Россия')
	const russianCity = russianPoi.filter(item => cityTypes.includes(item.type as any))
	const russianOnlyCity = russianPoi.filter(item => item.type === 'город')
	const russianRegion = total.filter(i => subjectPederationTypes.includes(i.type as any))
	const closedTown = russianPoi.filter(item => item.type === 'ЗАТО')

	return (
		<FactoidList
			countInRow={4}
			factoids={[
				{
					description: 'посещённые регионы РФ',
					digit: russianRegion.filter(i => i.visited).length,
					digitFrom: `из ${russianRegion.length}`,
				},
				{
					description: 'населёныне пункты РФ',
					digit: russianCity.filter(i => i.visited).length,
					digitFrom: `из ${russianCity.length}`,
				},
				{
					description: 'города РФ',
					digit: russianOnlyCity.filter(i => i.visited).length,
					digitFrom: `из ${russianOnlyCity.length}`,
				},
				{
					description: 'ЗАТО',
					digit: closedTown.filter(i => i.visited).length,
					digitFrom: `из ${closedTown.length}`,
				},
			]}
		/>
	)
}
