import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

type LogismSinglePropsType = {
	logismItem: LogismType | null
	reload: () => void
}

export const LogismInvite: FunctionComponent<LogismSinglePropsType> = ({
	logismItem,
	reload,
}) => logismItem && (
	<PrecentationContainer className="single-logism">
		<TextContainer>
			<div
				className="single-logism__text"
				dangerouslySetInnerHTML={{__html: logismItem.text}}
			/>
		</TextContainer>
		<TextContainer className="single-logism__navigation">
			<span
				className="single-logism__reload"
				onClick={reload}
			>
				↺
			</span>
			<a href={ROUTE_LINK.logism} className="single-logism__link">Другие логизмы →</a>
		</TextContainer>
	</PrecentationContainer>
)
