import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaStatistic } from 'components/nokia/nokia-statistic'

import '../../../components/nokia/nokia-style.css'

export const NokiaStatisticPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Статистика</h1>
			</div>
			<NokiaStatistic />
		</div>
	)
}
