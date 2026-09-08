import { NokiaMeetingStatisticType } from 'api-types/nokia.types'
import { FunctionComponent } from 'preact'

import useApi from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaStatistic } from 'components/nokia/nokia-statistic'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../../../components/nokia/nokia-style.css'

export const NokiaStatisticPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const [meetingStatistic] = useApi<NokiaMeetingStatisticType[]>(API_ROUTE.nokiaStatistic)
	const isLoadingMeetingStatistic = useLoadingState([meetingStatistic.status])
	const isEmptyMeetingStatistic = useEmptyDataState(meetingStatistic.data)

	if (isLoadingMeetingStatistic) {
		return <Loading />
	}
	if (isEmptyMeetingStatistic) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Статистика</h1>
			</div>
			<NokiaStatistic meetingStatistic={meetingStatistic.data} />
		</div>
	)
}
