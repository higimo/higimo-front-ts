import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqSingle } from 'components/info-service/faq/faq-single'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'

export const FaqSinglePage: FunctionComponent = () => {
	const { params: { idcode = ''} } = useRoute()

	const [ faqDetail ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))

	return (
		<Layout title={faqDetail.data?.name || 'FAQ'} className="faq-page">
			<LoadSuspense data={faqDetail}>
				<EmptyData data={faqDetail}>
					<FaqSingle faq={faqDetail.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
