import { FunctionComponent } from 'preact'
import { onlyPoiTypes } from 'api-types/tourism.types'
import { PoiType } from 'api-types/tourism.types'

import { FactoidList } from 'components/ui/factoid-list/FactoidList'

type TourismStatisticMustPoiPropsType = {
	total: PoiType[]
}

export const TourismStatisticMustPoi: FunctionComponent<TourismStatisticMustPoiPropsType> = ({ total }) => {
	const russianPoi = total.filter(item => item.country === 'Россия')
	const onlyPoi = russianPoi.filter(item => onlyPoiTypes.includes(item.type as any))
	const castle = russianPoi.filter(item => item.type === 'крепость')
	const deadTown = russianPoi.filter(item => item.type === 'вымерший город')
	const quarrie = russianPoi.filter(item => item.type === 'каменоломни')
	const park = russianPoi.filter(item => item.type === 'парк')
	const monastery = russianPoi.filter(item => item.type === 'монастырь')

	return (
		<FactoidList
			countInRow={6}
			factoids={[
				{
					description: 'впечатляющие места',
					digit: onlyPoi.filter(i => i.visited).length,
					digitFrom: `из ${onlyPoi.length}`,
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
