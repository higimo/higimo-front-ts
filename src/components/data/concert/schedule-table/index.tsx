import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { TableRow } from 'components/data/concert/table-row'
import { TextContainer } from 'components/ui/text-container'

import { getDateFromTimestamp } from 'utils/formatter/get-date-from-timestamp'

let currentDay: number = -1

interface ScheduleTableProps {
	headers?: string[]
	data: NasheType[]
}

/**
 * Компонент для отображения таблицы с расписанием
 */
export const ScheduleTable: FunctionComponent<ScheduleTableProps> = ({ data, headers }) => {
	return (
		<table className="line-up">
			{headers ? (
				<thead>
					{headers.map(header => <th>{header}</th>)}
				</thead>
			) : null}
			<tbody>
				{data.map((item, index) => {
					const day = getDateFromTimestamp(item.time)
					return (
						<TableRow
							key={`${item.id}-${index}`}
							time={item.time}
							day={currentDay !== day ? currentDay = day : null}
							name={item.name}
							visit={item.visit}
						/>
					)
				})}
			</tbody>
		</table>
	)
}
