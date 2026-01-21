import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaIndex } from 'components/nokia/nokia-index'

import '../nokia-style.css'

export const NokiaIndexPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Встречи</h1>
				<NokiaIndex />
			</div>
		</div>
	)
}
