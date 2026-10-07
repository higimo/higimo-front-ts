import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleDetailCardItem } from 'components/nokia/nokia-people-detail-card-item'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../nokia-style.css'

export const NokiaPeopleDetailCardPage: FunctionComponent = () => {
	const { params: { personId = DEFAULT_ID }} = useRoute()

	const [ personItem ] = useApi<NokiaPersonFullType>(API_ROUTE.nokiaPersonSingle({ id: personId }))

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Профиль</h1>

				<LoadSuspense data={personItem}>
					<EmptyData data={personItem}>
						<NokiaPeopleDetailCardItem personItem={personItem.data} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
