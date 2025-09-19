import { FunctionComponent } from 'preact'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaForm } from 'components/nokia/nokia-form'

import '../nokia-style.css'

export const NokiaFormPage: FunctionComponent = () => {
	document.title = 'Нокиа сервис'

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<NokiaForm />
			</div>
		</div>
	)
}
