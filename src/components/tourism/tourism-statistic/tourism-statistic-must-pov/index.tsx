import { FunctionComponent } from 'preact'
import { onlyPovTypes } from 'api-types/tourism.types'
import { PoiType } from 'api-types/tourism.types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'

type TourismStatisticMustPovPropsType = {
	total: PoiType[]
}

export const TourismStatisticMustPov: FunctionComponent<TourismStatisticMustPovPropsType> = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const onlyPov = russianPov.filter(item => onlyPovTypes.includes(item.type as any))
	const castle = russianPov.filter(item => item.type === 'крепость')
	const deadTown = russianPov.filter(item => item.type === 'вымерший город')
	const quarrie = russianPov.filter(item => item.type === 'каменоломни')
	const park = russianPov.filter(item => item.type === 'парк')
	const monastery = russianPov.filter(item => item.type === 'монастырь')

	return (
		<FactoidList
			countInRow={6}
			factoids={[
				{
					description: 'впечатляющие места',
					digit: onlyPov.filter(i => i.visited).length,
					digitFrom: `из ${onlyPov.length}`,
				},
				{
					description: 'крепости',
					digit: castle.filter(i => i.visited).length,
					digitFrom: `из ${castle.length}`,
				},
				{
					description: 'вымершие города',
					digit: deadTown.filter(i => i.visited).length,
					digitFrom: `из ${deadTown.length}`,
				},
				{
					description: 'каменоломни',
					digit: quarrie.filter(i => i.visited).length,
					digitFrom: `из ${quarrie.length}`,
				},
				{
					description: 'парки',
					digit: park.filter(i => i.visited).length,
					digitFrom: `из ${park.length}`,
				},
				{
					description: 'монастыри',
					digit: monastery.filter(i => i.visited).length,
					digitFrom: `из ${monastery.length}`,
				},
			]}
		/>
	)
}
