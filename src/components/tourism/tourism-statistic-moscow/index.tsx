import { FunctionComponent } from 'preact'
import { PovType } from 'components/tourism/data/types'

import { Fragment } from 'preact/jsx-runtime'
import { FactoidRow } from 'components/ui/factoid-row'
import { TextContainer } from 'components/ui/text-container'

type TourismStatisticMoscowPropsType = {
	total: PovType[]
}
export const TourismStatisticMoscow: FunctionComponent<TourismStatisticMoscowPropsType> = ({ total }) => {
	const russianPov = total.filter(item => 'country' in item && item.country === 'Россия')
	const moscowAdmOkrug = russianPov.filter(item => item.type === 'административный округ Москвы')
	const moscowTowns = russianPov.filter(item => item.type === 'поселение Москвы')
	const moscowDistrict = russianPov.filter(item => item.type === 'район Москвы')

	return (
		<Fragment>
			<TextContainer>
				<h2 className="statistic-header">По Москве</h2>
				<p>
					Я очень люблю Москву. Она — Русское поле экспериментов. Например, в Курьяново построили двухэтажные домики, которые стали прообразом для застройки моей родной Шахуньи. Поэтому, мне важно побывать во всех округах и районах Москвы, на всех станциях метро. А ещё я хочу обойти кажду улицу внутри МКАД.
				</p>
			</TextContainer>
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
		</Fragment>
	)
}
