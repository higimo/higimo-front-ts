import { FunctionComponent } from 'preact'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleDetailCard } from 'components/nokia/nokia-people-detail-card'

import '../nokia-style.css'

export const NokiaPeopleDetailCardPage: FunctionComponent = () => {
	document.title = 'Нокиа сервис'

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Встречи</h1>
				<NokiaPeopleDetailCard />
			</div>
		</div>
	)
}
