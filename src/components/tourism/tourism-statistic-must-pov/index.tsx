import { Fragment } from 'preact/jsx-runtime'
import { onlyPovTypes } from 'components/tourism/data/city-types'
import { FactoidRow } from 'components/ui/factoid-row'
import { TextContainer } from 'components/ui/text-container'

export const TourismStatisticMustPov = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const onlyPov = russianPov.filter(item => onlyPovTypes.includes(item.type))
	const castle = russianPov.filter(item => item.type === 'крепость')
	const deadTown = russianPov.filter(item => item.type === 'вымерший город')
	const quarrie = russianPov.filter(item => item.type === 'каменоломни')
	const park = russianPov.filter(item => item.type === 'парк')
	const monastery = russianPov.filter(item => item.type === 'монастырь')
	return (
		<Fragment>
			<TextContainer>
				<h2 className="statistic-header">Впечатляющие места</h2>
				<p>
					Здесь нет городов, где живут люди. Только точки интереса на карте, куда мне интересно попасть
				</p>
			</TextContainer>
			<FactoidRow
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
		</Fragment>
	)
}
