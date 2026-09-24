import { UnixTime } from 'utils.type'

import { formatTime } from 'utils/date/format-time'

interface TableRowProps {
	time: number
	name: string
	visit: number
	day: number | null
}

/**
 * Компонент для отображения строки таблицы
 */
export const TableRow: React.FC<TableRowProps> = ({ time, name, visit, day }) => {
	return (
		<tr>
			<td className="date">{day}</td>
			<td className="time">{formatTime(time as UnixTime)}</td>
			<td className="artist-name">
				{visit ? <span className="visited">★</span> : ''}
				{name}
			</td>
		</tr>
	)
}
