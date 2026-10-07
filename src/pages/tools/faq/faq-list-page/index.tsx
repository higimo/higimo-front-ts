import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqList } from 'components/info-service/faq/faq-list'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { OnlyAdmin } from 'components/util/only-admin'

import { faqApi } from 'repositories/faq-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../faq-style.css'

const onRemove = (id: FaqType['id']) => () => {
	faqApi.delete(id)
}

export const FaqListPage: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType[]>(API_ROUTE.faq)

	return (
		<Layout title="Статьи FAQ" className="faq-identity-page">
			<OnlyAdmin>
				<a href={ROUTE_LINKS.faqForm}>Создать</a>
			</OnlyAdmin>
			<LoadSuspense data={faqList}>
				<EmptyData data={faqList}>
					<FaqList
						faqList={faqList.data}
						onRemove={onRemove}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
