import { cityTypes, subjectPederationTypes } from 'components/tourism/types'
import { FunctionComponent } from 'preact'
import { PovType } from 'components/tourism/types'

import { FactoidRow } from 'components/ui/factoid-row'

type TourismStatisticRussiaPropsType = {
	total: PovType[]
}

export const TourismStatisticRussia: FunctionComponent<TourismStatisticRussiaPropsType> = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const russianCity = russianPov.filter(item => cityTypes.includes(item.type as any))
	const russianOnlyCity = russianPov.filter(item => item.type === 'город')
	const russianRegion = total.filter(i => subjectPederationTypes.includes(i.type as any))
	const closedTown = russianPov.filter(item => item.type === 'ЗАТО')

	return (
		<FactoidRow
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
