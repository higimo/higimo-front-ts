import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { NasheScheduleTableRow } from 'components/tourism/concert/nashe-schedule-table-row'

import { getDateFromTimestamp } from 'utils/date/get-date-from-timestamp'

let currentDay: number = -1

type NasheScheduleTablePropsType = {
	headers?: string[]
	data: NasheType[]
}

/**
 * Компонент для отображения таблицы с расписанием
 */
export const NasheScheduleTable: FunctionComponent<NasheScheduleTablePropsType> = ({
	data,
	headers,
}) => (
	<table className="line-up">
		{headers ? (
			<thead>
				{headers.map(header => <th key={header}>{header}</th>)}
			</thead>
		) : null}
		<tbody>
			{data.map((item, index) => {
				const day = getDateFromTimestamp(item.time)
				return (
					<NasheScheduleTableRow
						key={`${item.id}-${index}`}
						day={currentDay !== day ? currentDay = day : null}
						{...item}
					/>
				)
			})}
		</tbody>
	</table>
)
