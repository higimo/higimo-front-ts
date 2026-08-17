import { FunctionComponent } from 'preact'
import { PovType } from 'components/tourism/data/types'

import { FactoidRow } from 'components/ui/factoid-row'

type TourismStatisticMoscowPropsType = {
	total: PovType[]
}

export const TourismStatisticMoscow: FunctionComponent<TourismStatisticMoscowPropsType> = ({ total }) => {
	const russianPov = total.filter(item => 'country' in item && item.country === 'Россия')
	const moscowAdmOkrug = russianPov.filter(item => item.type === 'административный округ Москвы')
	const moscowTowns = russianPov.filter(item => item.type === 'поселение Москвы')
	const moscowDistrict = russianPov.filter(item => item.type === 'район Москвы')

	return (
		<FactoidRow
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
