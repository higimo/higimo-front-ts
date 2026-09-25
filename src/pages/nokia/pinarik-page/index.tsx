import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'

import { useCallback, useState } from 'preact/hooks'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { PinarikCalendar } from 'components/pinarik/pinarik-calendar'
import { PinarikEventPreview } from 'components/pinarik/pinarik-event-preview'
import { PinarikForm } from 'components/pinarik/pinarik-form'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'
import './style.css'

export const PinarikPage: FunctionComponent = () => {
	const [ pinarikList ] = useApi<PinarikType[]>(API_ROUTE.pinarik)
	const isLoading = useLoadingState([pinarikList.status])
	const isListEmpty = useEmptyDataState(pinarikList.data)

	const [ previewId, setPreviewId ] = useState<PinarikType['id']>(0 as PinarikType['id'])
	const handleClickPreviewId = useCallback((id: PinarikType['id']) => () => setPreviewId(id), [setPreviewId])

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia">
			<NokiaMenu />

			<TextContainer>
				<PinarikForm />
			</TextContainer>

			<TextContainer>
				<PinarikEventPreview
					id={previewId}
					pinarik={pinarikList.data}
				/>
			</TextContainer>

			<TextContainer>
				<PinarikCalendar
					pinarik={pinarikList.data}
					onClickPreviewId={handleClickPreviewId}
				/>
			</TextContainer>
		</div>
	)
}
