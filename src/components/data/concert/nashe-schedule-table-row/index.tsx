import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { formatTime } from 'utils/date/format-time'

type NasheScheduleTableRowPropsType = NasheType & {
	day: number | null
}

/**
 * Компонент для отображения строки таблицы
 */
export const NasheScheduleTableRow: FunctionComponent<NasheScheduleTableRowPropsType> = ({ time, name, visit, day }) => (
	<tr>
		<td className="date">{day}</td>
		<td className="time">{formatTime(time)}</td>
		<td className="artist-name">
			{visit ? <span className="visited">★</span> : ''}
			{name}
		</td>
	</tr>
)
