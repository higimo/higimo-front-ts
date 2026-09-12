import { FunctionComponent } from 'preact'
import { PinarikTreeYearType, PinarikType } from 'api-types/pinarik.types'

import { PinarikElement } from 'components/pinarik/pinarik-element'

type PinarikCalendarPropsType = {
	treeYear: PinarikTreeYearType
	onClickPreviewId: (id: PinarikType['id']) => () => void
}

export const PinarikCalendar: FunctionComponent<PinarikCalendarPropsType> = ({
	treeYear,
	onClickPreviewId
}) => Object.keys(treeYear).map(year => (
	<div className="pinarik-year">
		<h2>{year}</h2>
		<div className="pinarik-calendar">
			{treeYear[year]!.map(day => (
				<PinarikElement
					{...day!}
					onClick={onClickPreviewId(day.id)}
				/>
			))}
		</div>
	</div>
))
