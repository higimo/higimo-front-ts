import { PinarikType } from 'types'
import { Fragment } from 'preact/jsx-runtime'

import { useState } from 'preact/hooks'
import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { PinarikEventPreview } from 'components/pinarik/pinarik-event-preview'
import { PinarikElement } from 'components/pinarik/pinarik-element'

import { API_ROUTE } from 'dic/api-route'

export const PinarikCalendar = () => {
	const [ previewId, setPreviewId ] = useState(0)
	const [ pinarikList ] = useApi<PinarikType>(API_ROUTE.pinarik)
	const isLoading = useLoadingState([pinarikList.status])
	const isListEmpty = useEmptyDataState(pinarikList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	let treeYear = {}
	for (const item of pinarikList.data) {
		const year = item.date.substring(0, 4)
		if (!treeYear[year]) {
			treeYear[year] = []
		}
		treeYear[year].push(item)
	}

	return (
		<Fragment>
			<div className="text-container">
				<PinarikEventPreview id={previewId} list={pinarikList.data} />
			</div>
			<div className="text-container">
				{Object.keys(treeYear).map(year => (
					<div className="pinarik-year">
						<h2>{year}</h2>
						<div className="pinarik-calendar">
							{treeYear[year].map(day => (
								<PinarikElement {...day} onClick={() => setPreviewId(day.id)} />
							))}
						</div>
					</div>
				))}
			</div>
		</Fragment>
	)
}
