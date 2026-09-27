import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useTags } from 'hook/data/use-tags'

import { Loading } from 'components/ui/loading'
import { MeetingTags } from 'components/nokia/meeting-tags'
import { NokiaMeetingGallery } from 'components/nokia/nokia-meeting-gallery'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

export const NokiaIndexPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const [richMeetings] = useApi<NokiaRichMeetingType[]>(API_ROUTE.nokiaRichMeeting)
	const isLoadingRichMeeting = useLoadingState([richMeetings.status])
	const isEmptyRichMeeting = useEmptyDataState(richMeetings.data)

	// TODO: [BACKEND] заменить на фильтрацию по тегам в бекенде
	const meetingTags = useMemo(() => {
		if (richMeetings.status !== 'LOADED') {
			return []
		}

		return Array.from(new Set(richMeetings.data.map(i => i.type)))
	}, [richMeetings])

	const [ selectedTags, handleTagClick ] = useTags(meetingTags)

	const filtredMeetings = useMemo(() => {
		if (richMeetings.status !== 'LOADED') {
			return []
		}
		if (!selectedTags.length) {
			return richMeetings.data
		}

		return richMeetings.data.filter(meeting => selectedTags.includes(meeting.type))
	}, [richMeetings.data, selectedTags])

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
				<MeetingTags
					tags={meetingTags}
					selectedTags={selectedTags}
					onClick={handleTagClick}
				/>
				<NokiaMeetingGallery meetings={filtredMeetings} />
			</div>
		</div>
	)
}
