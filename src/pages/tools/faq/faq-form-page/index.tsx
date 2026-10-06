import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqForm } from 'components/info-service/faq/faq-form'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../faq-style.css'

export const FaqFormPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID} } = useRoute()

	const [ faqDetail ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))

	return (
		<Layout title={faqDetail.data?.name || 'FAQ'} className="faq-identity-page">
			<LoadSuspense data={faqDetail}>
				<EmptyData data={faqDetail} skipEmpty>
					<FaqForm
						key={faqDetail.data?.id ?? DEFAULT_ID}
						initialData={faqDetail.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
