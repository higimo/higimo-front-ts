import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPersonDetail } from 'components/nokia/nokia-person-detail'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../nokia-style.css'

export const NokiaPersonDetailPage: FunctionComponent = () => {
	const { params: { personId = DEFAULT_ID }} = useRoute()

	const [ personItem ] = useApi<NokiaPersonFullType>(API_ROUTE.nokiaPersonSingle({ id: personId }))

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<TextContainer>
				{/* TODO: [MIDDLE] мб, прописывать имя здесь? */}
				<h1>Профиль</h1>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={personItem}>
					<EmptyData data={personItem}>
						<NokiaPersonDetail
							key={personItem.data?.id ?? DEFAULT_ID}
							personItem={personItem.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
