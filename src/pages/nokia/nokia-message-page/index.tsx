import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaMessage } from 'components/nokia/nokia-message'

import '../nokia-style.css'

export const NokiaMessagePage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Последние коннекты по людям</h1>
				<NokiaMessage />
			</div>
		</div>
	)
}
