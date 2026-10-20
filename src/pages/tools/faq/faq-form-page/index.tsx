import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqForm } from 'components/info-service/faq/faq-form'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { ifTitle } from 'utils/if-title'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../faq-style.css'

export const FaqFormPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID} } = useRoute()

	const [ faqItem ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))

	const title = ifTitle(idcode, 'Создание FAQ', 'Редактирование FAQ')

	return (
		<Layout title={`${title} | FAQ`} className="faq-identity-page">
			<h1>{title}</h1>
			<LoadSuspense data={faqItem}>
				<EmptyData data={faqItem} skipEmpty>
					<FaqForm
						key={faqItem.data?.id ?? DEFAULT_ID}
						initialData={faqItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
