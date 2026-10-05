import { FunctionComponent } from 'preact'
import { PinarikTreeYearType, PinarikType } from 'api-types/pinarik.types'

import { useMemo } from 'preact/hooks'

import { PinarikElement } from 'components/pinarik/pinarik-element'

import { groupBy } from 'utils/group-by'

type PinarikCalendarPropsType = {
	pinarik: PinarikType[]
	onClickPreviewId: (pinarik: PinarikType) => () => void
}

export const PinarikCalendar: FunctionComponent<PinarikCalendarPropsType> = ({
	pinarik,
	onClickPreviewId
}) => {
	const treeYear: PinarikTreeYearType = useMemo(() => {
		if (!Object.keys(pinarik).length) {
			return {}
		}
		const treeYear: PinarikTreeYearType = groupBy(
			pinarik,
			(item) => item.date.substring(0, 4)
		)
		return treeYear
	}, [pinarik])

	return Object.keys(treeYear).map(year => (
		<div className="pinarik-year">
			<h2>{year}</h2>
			<div className="pinarik-calendar">
				{treeYear[year]!.map(day => (
					<PinarikElement
						{...day!}
						onClick={onClickPreviewId(day)}
					/>
				))}
			</div>
		</div>
	))
}
