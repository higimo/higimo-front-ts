import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { FaqList } from 'components/info-service/faq/faq-list'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { OnlyAdmin } from 'components/util/only-admin'

import { faqApi } from 'repositories/faq-api.repository'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../faq-style.css'
import { TextContainer } from 'components/ui/text-container/TextContainer'

const onRemove = (id: FaqType['id']) => () => {
	faqApi.delete(id)
}

export const FaqListPage: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType[]>(API_ROUTE.faq)

	return (
		<Layout title="Статьи FAQ" className="faq-identity-page">
			<TextContainer>
				<OnlyAdmin>
					<a href={ROUTE_LINK.faqForm}>Создать</a>
				</OnlyAdmin>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={faqList}>
					<EmptyData data={faqList}>
						<FaqList
							faqList={faqList.data}
							onRemove={onRemove}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
