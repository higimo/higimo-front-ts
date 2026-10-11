import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { useApi } from 'hook/fetch/use-api'

import { BlogList } from 'components/blog/blog-list'
import { EmptyData } from 'components/ui/empty-data'
import { IntroHeader } from 'components/ui/intro-header'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/route/API_ROUTE'

export const BlogListPage: FunctionComponent = () => {
	const [ newsList ] = useApi<UpdateNewsType[]>(API_ROUTE.updateNews, { limit: 12 })

	return (
		<Layout title="Последние сообщения в блоге">
			<PrecentationContainer className="last-updates">
				<TextContainer>
					<IntroHeader>Недавно опубликовал</IntroHeader>
				</TextContainer>

				<LoadSuspense data={newsList}>
					<EmptyData data={newsList}>
						<BlogList
							newsList={newsList.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</PrecentationContainer>
		</Layout>
	)
}
