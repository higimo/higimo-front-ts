import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaMetingFormController } from 'components/nokia/form/nokia-meting-form-controller'

import '../nokia-style.css'

export const NokiaMeetingFormPage: FunctionComponent = () => {
	usePageTitle('Редактирование и создание встречи // Нокиа')

	return (
		<div className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<NokiaMetingFormController />
			</div>
		</div>
	)
}
