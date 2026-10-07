import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useTags } from 'hook/data/use-tags'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MeetingTags } from 'components/nokia/meeting-tags'
import { NokiaMeetingGallery } from 'components/nokia/nokia-meeting-gallery'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

export const NokiaIndexPage: FunctionComponent = () => {
	const [ richMeetingList ] = useApi<NokiaRichMeetingType[]>(API_ROUTE.nokiaRichMeeting)

	// TODO: [BACKEND] заменить на фильтрацию по тегам в бекенде
	const meetingTags = useMemo(() => {
		if (richMeetingList.status !== 'LOADED' || !richMeetingList.data) {
			return []
		}

		return Array.from(new Set(richMeetingList.data.map(i => i.type)))
	}, [richMeetingList])

	const [ selectedTags, handleTagClick ] = useTags(meetingTags)

	const filtredMeetings = useMemo(() => {
		if (richMeetingList.status !== 'LOADED' || !richMeetingList.data) {
			return []
		}
		if (!selectedTags.length) {
			return richMeetingList.data
		}

		return richMeetingList.data.filter(meeting => selectedTags.includes(meeting.type))
	}, [richMeetingList.data, selectedTags])

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Встречи</h1>

				<LoadSuspense data={richMeetingList}>
					<EmptyData data={richMeetingList}>
						<MeetingTags
							tags={meetingTags}
							selectedTags={selectedTags}
							onClick={handleTagClick}
						/>

						<NokiaMeetingGallery meetings={filtredMeetings} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
