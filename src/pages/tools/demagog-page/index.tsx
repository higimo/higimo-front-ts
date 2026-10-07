import { DemagogType } from 'api-types/demagog.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { DemagogGalery } from 'components/info-service/demagog/demagog-galery'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

export const DemagogPage: FunctionComponent = () => {
	const [ demagogList ] = useApi<DemagogType[]>(API_ROUTE.demagog)

	return (
		<Layout title="Справочник демагога" className="demagog-page">
			<TextContainer>
				<p>
					Справочник демагога — это живой справочник полимических приемов. Этот справочник можно использовать во зло или во имя добра, склонять на свою сторону уловками и выводить оппонента на чистую воду. Ничто не истина, будьте осторожны и правы. Приветствуется распространение ссылок на справочник.
				</p>
			</TextContainer>

			<LoadSuspense data={demagogList}>
				<EmptyData data={demagogList}>
					<DemagogGalery demagogList={demagogList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
