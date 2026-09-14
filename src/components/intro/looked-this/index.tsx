import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/intro/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { aboutMeList } from 'components/intro/looked-this/data'

import './style.css'

export const LookedThis: FunctionComponent = () => (
	<PrecentationContainer className="looked-this">
		<TextContainer>
			<IntroHeader>Смотрю и читаю</IntroHeader>
		</TextContainer>

		<TextContainer>
			<ul className="looked-this__lists">
				{aboutMeList.map(item => (
					<li className="looked-this__item">
						<a
							className="looked-this__link"
							target="_blank"
							href={item.href as string}
						>
							{item.name}
						</a>
					</li>
				))}
			</ul>
		</TextContainer>
	</PrecentationContainer>
)
