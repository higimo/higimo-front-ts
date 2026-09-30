import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqList } from 'components/info-service/faq/faq-list'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../faq-style.css'

// TODO: добавить форму добавления, как у /lib/
export const FaqListPage: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType[]>(API_ROUTE.faq)

	return (
		<Layout title="Статьи FAQ" className="faq-identity-page">
			<LoadSuspense data={faqList}>
				<EmptyData data={faqList}>
					<FaqList faqs={faqList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
