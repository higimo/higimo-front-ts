import { FunctionComponent } from 'preact'

import { NokiaMenu } from '../../../components/nokia/nokia-menu'
import { NokiaAddPerson } from '../../../components/nokia/nokia-add-person'

import '../nokia-style.css'

export const NokiaAddPersonPage: FunctionComponent = () => {
	document.title = 'Нокиа сервис'

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Редактирование и создание человека</h1>
				<NokiaAddPerson />
			</div>
		</div>
	)
}
