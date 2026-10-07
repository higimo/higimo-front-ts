import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqSingle } from 'components/info-service/faq/faq-single'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../faq-style.css'

export const FaqSinglePage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID} } = useRoute()

	const [ faqItem ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))

	return (
		<Layout title={faqItem.data?.name || 'FAQ'} className="faq-identity-page">
			<LoadSuspense data={faqItem}>
				<EmptyData data={faqItem}>
					<FaqSingle faq={faqItem.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
