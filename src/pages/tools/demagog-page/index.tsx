import { DemagogType } from 'api-types/demagog.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useApi } from 'hook/fetch/use-api'

import { DemagogGalery } from 'components/info-service/demagog/demagog-galery'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

export const DemagogPage: FunctionComponent = () => {
	usePageTitle('Справочник демагога')

	const [ demagogList ] = useApi<DemagogType[]>(API_ROUTE.demagog)
	const isLoading = useLoadingState([demagogList.status])
	const isListEmpty = useEmptyDataState(demagogList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="demagog-page">
			<TextContainer>
				<p>
					Справочник демагога&nbsp;&mdash; это живой справочник полимических приемов. Этот справочник можно использовать во&nbsp;зло или во&nbsp;имя добра, склонять на&nbsp;свою сторону уловками и&nbsp;выводить оппонента на&nbsp;чистую воду. Ничто не&nbsp;истина, будьте осторожны и&nbsp;правы. Приветствуется распространение ссылок на&nbsp;справочник.
				</p>
			</TextContainer>
			<DemagogGalery demagogs={demagogList.data} />
		</div>
	)
}
