import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { YoutubeGalery } from 'components/info-service/youtube/youtube-galery'

import { API_ROUTE } from 'dic/API_ROUTE'

export const YoutubePage: FunctionComponent = () => {
	const [ youtubeList ] = useApi<YoutubeType[]>(API_ROUTE.youtube)

	return (
		<Layout title="Избранные видосы">
			<LoadSuspense data={youtubeList}>
				<EmptyData data={youtubeList}>
					<YoutubeGalery youtubeList={youtubeList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
