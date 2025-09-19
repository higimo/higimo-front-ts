import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const RomaSchool: FunctionComponent = () => (
	<div className="roma-school">
		<TextContainer>
			<p>
				Совместно с <a href={EXTERNAL_LINKS.vatrikovsky}>Ромой</a> веду интенсив в <a href={ROUTE_LINKS.TODO_VATRIKOVSKY_SCHOOL}>школе Ромы Ватриковского</a>.
			</p>
			<p>
				Пока можете подписаться на <a href={ROUTE_LINKS.TODO}>канал в телеге</a>. Там объявим, когда пройдёт следующий интенсив, а между делом рассказываем полезное и сплочаем сообщество.
			</p>
		</TextContainer>
	</div>
)
