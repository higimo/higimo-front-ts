import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const LogismSingle: FunctionComponent = () => {
	const [ logismDetail ] = useApi<LogismType>(API_ROUTE.logismSingle)
	const isLoading = useLoadingState([logismDetail.status])
	const isListEmpty = useEmptyDataState(logismDetail.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<PrecentationContainer className="single-logism">
			<TextContainer>
				<div
					className="single-logism__text"
					dangerouslySetInnerHTML={{__html: logismDetail.data.text}}
				/>
			</TextContainer>
			<TextContainer className="single-logism__navigation">
				<a href={ROUTE_LINKS.logism} className="single-logism__link">Другие логизмы →</a>
			</TextContainer>
		</PrecentationContainer>
	)
}
