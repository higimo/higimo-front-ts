import { PoiType } from 'api-types/tourism.types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'
import { FunctionComponent } from 'preact'

type TourismStatisticWorldPropsType = {
	total: PoiType[]
}

export const TourismStatisticWorld: FunctionComponent<TourismStatisticWorldPropsType> = ({ total }) => {
	const russianPoi = total.filter(item => item.country === 'Россия')
	const aroundRussia = total.filter(item => item.country !== 'Россия')

	return (
		<FactoidList
			countInRow={4}
			factoids={[
				{
					description: 'всего посетил городов и мест',
					digit: total.filter(i => i.visited).length,
					digitFrom: `из ${total.length}`,
				},
				{
					description: 'всего посетил в России',
					digit: russianPoi.filter(i => i.visited).length,
					digitFrom: `из ${russianPoi.length}`,
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
