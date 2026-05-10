import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { TableRow } from 'components/data/concert/table-row'
import { TextContainer } from 'components/ui/text-container'

import { getDateFromTimestamp } from 'utils/get-date-from-timestamp'

let currentDay: number = -1

interface ScheduleTableProps {
	data: NasheType[]
	title: string
}

/**
 * Компонент для отображения таблицы с расписанием
 */
export const ScheduleTable: FunctionComponent<ScheduleTableProps> = ({ data, title }) => {
	return (
		<TextContainer>
			<h2>{title}</h2>
			<table className="line-up">
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
		</TextContainer>
	)
}
