import { FunctionComponent } from 'preact'
import { PinarikTreeYearType, PinarikType } from 'api-types/pinarik.types'

import { useMemo } from 'preact/hooks'

import { PinarikItem } from 'components/pinarik/pinarik-item'

import { groupBy } from 'utils/group-by'

type PinarikCalendarPropsType = {
	pinarikList: PinarikType[]
	onClickPreviewId: (pinarik: PinarikType) => () => void
}

export const PinarikCalendar: FunctionComponent<PinarikCalendarPropsType> = ({
	pinarikList,
	onClickPreviewId
}) => {
	const treeYear: PinarikTreeYearType = useMemo(() => {
		if (!Object.keys(pinarikList).length) {
			return {}
		}
		const treeYear: PinarikTreeYearType = groupBy(
			pinarikList,
			(item) => item.date.substring(0, 4)
		)
		return treeYear
	}, [pinarikList])

	return Object.keys(treeYear).map(year => (
		<div key={year} className="pinarik-year">
			<h2>{year}</h2>
			<div className="pinarik-calendar">
				{treeYear[year]!.map(day => (
					<PinarikItem
						key={day.id}
						{...day!}
						onClick={onClickPreviewId(day)}
					/>
				))}
			</div>
		</div>
	))
}
