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

	const [ preview, setPreview ] = useState<PinarikType>()
	const handleClickPreviewId = useCallback((pinarik: PinarikType) => () => setPreview(pinarik), [setPreview])

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
							pinarik={preview}
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
