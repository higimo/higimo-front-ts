import { FactoidRow } from "components/ui/factoid-row"
import { TextContainer } from "components/ui/text-container"
import { Fragment } from "preact/jsx-runtime"

export const TourismStatisticWorld = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const aroundRussia = total.filter(item => item.country !== 'Россия')
	return (
		<Fragment>
			<TextContainer>
				<h2 className="statistic-header">Статистика по миру</h2>
				<p>
					Сколько мест посетил из намеченного списка. И как называется список.
				</p>
			</TextContainer>
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
		</Fragment>
	)
}