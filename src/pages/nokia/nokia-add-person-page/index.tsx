import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPersonFormController } from 'components/nokia/form/nokia-person-form-controller'

import '../../../components/nokia/nokia-style.css'

export const NokiaAddPersonPage: FunctionComponent = () => {
	usePageTitle('Редактирование и создание человека // Нокиа')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Редактирование и создание человека</h1>
				<NokiaPersonFormController />
			</div>
		</div>
	)
}
