import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleDetailCard } from 'components/nokia/nokia-people-detail-card'

import 'components/nokia/nokia-style.css'

export const NokiaPeopleDetailCardPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Профиль</h1>
				<NokiaPeopleDetailCard />
			</div>
		</div>
	)
}
