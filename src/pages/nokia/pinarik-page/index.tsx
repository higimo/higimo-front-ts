import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'

import { useApi } from 'hook/fetch/use-api'
import { useCallback, useState } from 'preact/hooks'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { PinarikCalendar } from 'components/pinarik/pinarik-calendar'
import { PinarikEventPreview } from 'components/pinarik/pinarik-event-preview'
import { PinarikForm } from 'components/pinarik/pinarik-form'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'
import './style.css'

export const PinarikPage: FunctionComponent = () => {
	const [ pinarikList ] = useApi<PinarikType[]>(API_ROUTE.pinarik)

	const [ previewId, setPreviewId ] = useState<PinarikType['id']>(0 as PinarikType['id'])
	const handleClickPreviewId = useCallback((id: PinarikType['id']) => () => setPreviewId(id), [setPreviewId])

	return (
		<Layout title="Пинарик" className="nokia">
			<NokiaMenu />

			<TextContainer>
				<PinarikForm />
			</TextContainer>

			<LoadSuspense data={pinarikList}>
				<EmptyData data={pinarikList}>
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
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
