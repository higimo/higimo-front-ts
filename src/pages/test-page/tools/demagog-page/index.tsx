import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'

import { TextContainer } from 'components/ui/text-container'
import { DemagogGalery } from 'components/info-service/demagog/demagog-galery'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

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
		return <NotFoundData />
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
