import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaMetingFormController } from 'components/nokia/form/nokia-meting-form-controller'

import '../nokia-style.css'

export const NokiaMeetingFormPage: FunctionComponent = () => (
	<Layout title="Редактирование и создание встречи // Нокиа">
		<div className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<NokiaMetingFormController />
			</div>
		</div>
	</Layout>
)
