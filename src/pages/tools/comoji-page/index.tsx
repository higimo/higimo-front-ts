import { ComojiType } from 'api-types/comoji.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { ComojiGalery } from 'components/tool/comoji-galery'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ComojiPage: FunctionComponent = () => {
	const [ comojiList ] = useApi<ComojiType[]>(API_ROUTE.comoji)

	return (
		<Layout title="Комоджи смайлы">
			<div className="tool-index-page">
				<TextContainer>
					<h1>Комоджи смайлы</h1>
					<p>
						Нажимаешь на смайл — копируется в буфер обмена
					</p>
				</TextContainer>

				<LoadSuspense data={comojiList}>
					<EmptyData data={comojiList}>
						<ComojiGalery comoji={comojiList.data} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
