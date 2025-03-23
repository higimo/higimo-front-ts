import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../../ui/text-container'

import { aboutMeList } from './data'

import './style.css'

export const LookedThis: FunctionComponent = () => (
	<PrecentationContainer className="looked-this">
		<TextContainer className="looked-this__row">
			<div className="looked-this__column">
				<h2 className="looked-this__title">Смотрю и читаю</h2>
			</div>
			<div className="looked-this__column">
				<ul className="looked-this__lists">
					{aboutMeList.map(item => (
						<li className="looked-this__item">
							<a className="looked-this__link" target="_blank" href={item.url}>{item.title}</a>
						</li>
					))}
				</ul>
			</div>
		</TextContainer>
	</PrecentationContainer>
)
