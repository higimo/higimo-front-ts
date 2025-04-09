import { FunctionComponent } from 'preact'

import { NokiaMenu } from '../../../components/nokia/nokia-menu'

import { NokiaStatistic } from '../../../components/nokia/nokia-statistic'

import '../nokia-style.css'

export const NokiaStatisticPage: FunctionComponent = () => {
	document.title = 'Нокиа сервис'

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
