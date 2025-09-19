import { PinarikType } from 'types'

import { useState } from 'preact/hooks'
import useApi, { API_STATUS } from 'hook/use-api'

import { Fragment } from 'preact/jsx-runtime'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { API_ROUTE } from 'dic/api-route'
import { PinarikEventPreview } from '../pinarik-event-preview'
import { PinarikElement } from '../pinarik-element'

export const PinarikCalendar = () => {
	const [ previewId, setPreviewId ] = useState(0)
	const [ pinarikList ] = useApi<PinarikType>(API_ROUTE.pinarik)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(pinarikList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === pinarikList.status && !pinarikList.data.length) {
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
