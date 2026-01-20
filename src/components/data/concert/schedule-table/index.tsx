import { FunctionComponent } from 'preact'
import { NasheType } from 'components/data/concert/types'

import { useState } from 'preact/hooks'

import { TextContainer } from 'components/ui/text-container'
import { TableRow } from 'components/data/concert/table-row'

interface ScheduleTableProps {
	data: NasheType[]
	title: string
}

/**
 * Компонент для отображения таблицы с расписанием
 */
export const ScheduleTable: FunctionComponent<ScheduleTableProps> = ({ data, title }) => {
	const [currentDay, setCurrentDay] = useState<number | null>(null)
	
	return (
		<TextContainer>
			<h2>{title}</h2>
			<table className="line-up">
				<tbody>
					{data.map((item, index) => (
						<TableRow
							key={`${item.id}-${index}`}
							time={item.time}
							name={item.name}
							visit={item.visit}
							currentDay={currentDay}
							onDayChange={setCurrentDay}
						/>
					))}
				</tbody>
			</table>
		</TextContainer>
	)
}