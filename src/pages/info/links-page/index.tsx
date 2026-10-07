import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LinksList } from 'components/info-service/links/links-list'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LinksPage: FunctionComponent = () => {
	const [ linkList ] = useApi<LinksType[]>(API_ROUTE.link)

	return (
		<Layout title="Избранные ссылки" className="links-page">
			<TextContainer>
				<h2>Избранные ссылки</h2>
				<p>
					Собираю ссылки, которые впечатлили меня. Хочу чтобы про них знало побольше людей.
				</p>
			</TextContainer>

			<LoadSuspense data={linkList}>
				<EmptyData data={linkList}>
					<LinksList linkList={linkList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
