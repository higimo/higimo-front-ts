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
	const [ richMeetings ] = useApi<NokiaRichMeetingType[]>(API_ROUTE.nokiaRichMeeting)

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

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Встречи</h1>

				<LoadSuspense data={richMeetings}>
					<EmptyData data={richMeetings}>
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
