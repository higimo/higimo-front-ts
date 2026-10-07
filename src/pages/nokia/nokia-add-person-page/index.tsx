import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { Layout } from 'components/ui/layout/Layout'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { LoadSuspense } from 'components/ui/load-suspense'
import { EmptyData } from 'components/ui/empty-data'
import { NokiaPersonForm } from 'components/nokia/form/nokia-person-form'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../nokia-style.css'

export const NokiaAddPersonPage: FunctionComponent = () => {
	const { params: { personId = DEFAULT_ID } } = useRoute()

	const [ singlePerson ] = useApi<NokiaPersonType>(API_ROUTE.nokiaPersonSingle({ id: personId }))

	return (
		<Layout title="Редактирование и создание персоны // Нокиа" className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Редактирование и создание персоны</h1>

				<LoadSuspense data={singlePerson}>
					<EmptyData data={singlePerson} skipEmpty>
						<NokiaPersonForm
							key={singlePerson.data?.id ?? DEFAULT_ID}
							initialData={singlePerson.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
