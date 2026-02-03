import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaForm } from 'components/nokia/nokia-form'

import '../../../components/nokia/nokia-style.css'

export const NokiaFormPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<NokiaForm />
			</div>
		</div>
	)
}
