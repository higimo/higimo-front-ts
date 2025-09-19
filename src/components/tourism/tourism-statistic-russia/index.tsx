import { Fragment } from "preact/jsx-runtime"
import { cityTypes, subjectPederationTypes } from "components/tourism/tourism-data/city-types"
import { FactoidRow } from "components/ui/factoid-row"
import { TextContainer } from "components/ui/text-container"

export const TourismStatisticRussia = ({ total }) => {
	const russianPov = total.filter(item => item.country === 'Россия')
	const russianCity = russianPov.filter(item => cityTypes.includes(item.type))
	const russianOnlyCity = russianPov.filter(item => item.type === 'город')
	const russianRegion = total.filter(i => subjectPederationTypes.includes(i.type))
	const closedTown = russianPov.filter(item => item.type === 'ЗАТО')

	return (
		<Fragment>
			<TextContainer>
				<h2 className="statistic-header">По России</h2>
			</TextContainer>
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
		</Fragment>
	)
}