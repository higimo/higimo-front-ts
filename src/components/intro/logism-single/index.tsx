import { FunctionComponent } from 'preact'
import { LogismType } from 'components/logism/types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

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
			{logismDetail.data.map(({ text }) => (
				<TextContainer>
					<div
						className="single-logism__text"
						dangerouslySetInnerHTML={{__html: text}}
					/>
				</TextContainer>
			))}
			<TextContainer className="single-logism__navigation">
				<a href={ROUTE_LINKS.logism} className="single-logism__link">Другие логизмы →</a>
			</TextContainer>
		</PrecentationContainer>
	)
}
