import { FunctionComponent } from 'preact'
import { PoiType } from 'api-types/tourism.types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'

type TourismStatisticMoscowPropsType = {
	total: PoiType[]
}

export const TourismStatisticMoscow: FunctionComponent<TourismStatisticMoscowPropsType> = ({ total }) => {
	const russianPoi = total.filter(item => 'country' in item && item.country === 'Россия')
	const moscowAdmOkrug = russianPoi.filter(item => item.type === 'административный округ Москвы')
	const moscowTowns = russianPoi.filter(item => item.type === 'поселение Москвы')
	const moscowDistrict = russianPoi.filter(item => item.type === 'район Москвы')

	return (
		<FactoidList
			countInRow={4}
			factoids={[
				{
					description: 'округа Москвы',
					digit: moscowAdmOkrug.filter(i => i.visited).length,
					digitFrom: `из ${moscowAdmOkrug.length}`,
				},
				{
					description: 'поселения Москвы',
					digit: moscowTowns.filter(i => i.visited).length,
					digitFrom: `из ${moscowTowns.length}`,
				},
				{
					description: 'районы Москвы',
					digit: moscowDistrict.filter(i => i.visited).length,
					digitFrom: `из ${moscowDistrict.length}`,
				},
				{
					description: 'станции метро Москвы',
					digit: 120,
					digitFrom: `из 435`,
				},
			]}
		/>
	)
}
