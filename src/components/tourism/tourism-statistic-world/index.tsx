import { PovType } from 'components/tourism//data/types'

import { FactoidRow } from 'components/ui/factoid-row'
import { FunctionComponent } from 'preact'

type TourismStatisticWorldPropsType = {
	total: PovType[]
}

export const TourismStatisticWorld: FunctionComponent<TourismStatisticWorldPropsType> = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const aroundRussia = total.filter(item => item.country !== 'Россия')

	return (
		<FactoidRow
			countInRow={4}
			factoids={[
				{
					description: 'всего посетил городов и мест',
					digit: total.filter(i => i.visited).length,
					digitFrom: `из ${total.length}`,
				},
				{
					description: 'всего посетил в России',
					digit: russianPov.filter(i => i.visited).length,
					digitFrom: `из ${russianPov.length}`,
				},
				{
					description: 'посетил вне РФ',
					digit: aroundRussia.filter(i => i.visited).length,
					digitFrom: `из ${aroundRussia.length}`,
				},
			]}
		/>
	)
}
