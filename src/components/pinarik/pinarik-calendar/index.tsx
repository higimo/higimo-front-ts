import { FunctionComponent } from 'preact'
import { PinarikTreeYearType, PinarikType } from 'api-types/pinarik.types'

import { useMemo } from 'preact/hooks'

import { PinarikElement } from 'components/pinarik/pinarik-element'

type PinarikCalendarPropsType = {
	pinarik: PinarikType[]
	onClickPreviewId: (id: PinarikType['id']) => () => void
}

export const PinarikCalendar: FunctionComponent<PinarikCalendarPropsType> = ({
	pinarik,
	onClickPreviewId
}) => {
	const treeYear: PinarikTreeYearType = useMemo(() => {
		if (!Object.keys(pinarik).length) {
			return {}
		}
		let treeYear: PinarikTreeYearType = {}
		for (const item of pinarik) {
			const year = item.date.substring(0, 4)
			if (!treeYear[year]) {
				treeYear[year] = []
			}
			treeYear[year].push(item)
		}
		return treeYear
	}, [pinarik])

	return Object.keys(treeYear).map(year => (
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
}
