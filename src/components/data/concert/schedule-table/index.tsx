import { FunctionComponent } from 'preact'
import { NasheType } from 'components/data/concert/types'

import { useState } from 'preact/hooks'

import { TextContainer } from 'components/ui/text-container'
import { TableRow } from 'components/data/concert/table-row'
import { getDateFromTimestamp } from 'utils/get-date-from-timestamp'

interface ScheduleTableProps {
	data: NasheType[]
	title: string
}

let currentDay: number = -1

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