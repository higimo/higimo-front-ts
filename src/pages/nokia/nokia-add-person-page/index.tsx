import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPersonFormController } from 'components/nokia/form/nokia-person-form-controller'

import '../nokia-style.css'

export const NokiaAddPersonPage: FunctionComponent = () => (
	<Layout title="Редактирование и создание человека // Нокиа">
		<div className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Редактирование и создание человека</h1>

				<NokiaPersonFormController />
			</div>
		</div>
	</Layout>
)
