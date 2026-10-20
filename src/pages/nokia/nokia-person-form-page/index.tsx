import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPersonForm } from 'components/nokia/form/nokia-person-form'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { ifTitle } from 'utils/if-title'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../nokia-style.css'

export const NokiaPersonFormPage: FunctionComponent = () => {
	const { params: { personId = DEFAULT_ID } } = useRoute()

	const [ personItem ] = useApi<NokiaPersonType>(API_ROUTE.nokiaPersonSingle({ id: personId }))

	const title = ifTitle(personId, 'Создание персоны', 'Редактирование персоны')

	return (
		<Layout title={`${title} | Нокиа`} className="nokia">
			<NokiaMenu />

			<TextContainer>
				<h1>{title}</h1>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={personItem}>
					<EmptyData data={personItem} skipEmpty>
						<NokiaPersonForm
							key={personItem.data?.id ?? DEFAULT_ID}
							initialData={personItem.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
