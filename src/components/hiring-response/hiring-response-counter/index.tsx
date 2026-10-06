import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { FactoidRow } from 'components/ui/factoid-row'

import { createDateOnly } from 'utils/date/create-date-only'
import { getNowDay } from 'utils/date/get-now-day'
import { getStartLastWeek } from 'utils/date/get-start-last-week'
import { getStartOfWeek } from 'utils/date/get-start-of-week'
import { getYesterday } from 'utils/date/get-yesterday'

type HiringResponseCounterPropsType = {
	data: PasteApiType[] | null
}

export const HiringResponseCounter: FunctionComponent<HiringResponseCounterPropsType> = ({ data }) => {
	if (!data) {
		return null
	}
	const startOfLastWeek = createDateOnly(getStartLastWeek(new Date()))
	const startOfWeek     = createDateOnly(getStartOfWeek(new Date()))
	const yesterday       = createDateOnly(getYesterday(new Date()))
	const day             = createDateOnly(getNowDay(new Date()))

	const datastartOfLastWeek = data.filter(d => d.date >= startOfLastWeek)
	const dataStartOfWeek     = data.filter(d => d.date >= startOfWeek)
	const dataYesterDay       = data.filter(d => d.date >= yesterday && d.date < day)
	const dataNowDay          = data.filter(d => d.date >= day)

	return (
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
				{
					description: 'за прошлую неделю',
					digit: datastartOfLastWeek.length,
				},
			]}
		/>
	)
}
