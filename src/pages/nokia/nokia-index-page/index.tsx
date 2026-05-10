import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMeetingGallery } from 'components/nokia/nokia-meeting-gallery'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import 'components/nokia/nokia-style.css'

// Добавить фильтрацию по типам встреч
export const NokiaIndexPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const [richMeetings] = useApi<NokiaRichMeetingType[]>(API_ROUTE.nokiaRichMeeting)
	const isLoadingRichMeeting = useLoadingState([richMeetings.status])
	const isEmptyRichMeeting = useEmptyDataState(richMeetings.data)

	if (isLoadingRichMeeting) {
		return <Loading />
	}
	if (isEmptyRichMeeting) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Встречи</h1>
				<NokiaMeetingGallery meetings={richMeetings.data} />
			</div>
		</div>
	)
}
