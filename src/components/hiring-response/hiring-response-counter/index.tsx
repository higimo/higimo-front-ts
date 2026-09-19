import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { FactoidRow } from 'components/ui/factoid-row'

import { getNowDay } from 'utils/get-now-day'
import { getStartOfWeek } from 'utils/get-start-of-week'
import { getYesterday } from 'utils/get-yesterday'

type HiringResponseCounterPropsType = {
	data: PasteApiType[]
}

export const HiringResponseCounter: FunctionComponent<HiringResponseCounterPropsType> = ({ data }) => {
	const startOfWeek = getStartOfWeek(new Date()).toISOString().substr(0, 10)
	const yesterday = getYesterday(new Date()).toISOString().substr(0, 10)
	const day = getNowDay(new Date()).toISOString().substr(0, 10)

	const dataStartOfWeek = data.filter(d => d.date >= startOfWeek)
	const dataYesterDay = data.filter(d => d.date >= yesterday && d.date < day)
	const dataNowDay = data.filter(d => d.date >= day)

	return (
		<div>
			<h3>Откликов</h3>
			<FactoidRow
				mini
				countInRow={5}
				factoids={[
					{
						description: 'сегодня',
						digit: dataNowDay.length,
					},
					{
						description: 'вчера',
						digit: dataYesterDay.length,
					},
					{
						description: 'за неделю',
						digit: dataStartOfWeek.length,
					},
				]}
			/>
		</div>
	)
}
