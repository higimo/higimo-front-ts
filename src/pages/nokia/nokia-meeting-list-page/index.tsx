import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType, NokiaTagType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo, useState } from 'preact/hooks'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MeetingTagList } from 'components/nokia/meeting-tag-list'
import { NokiaMeetingList } from 'components/nokia/nokia-meeting-list'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../nokia-style.css'

export const NokiaMeetingListPage: FunctionComponent = () => {
	const [ richMeetingList ] = useApi<NokiaRichMeetingType[]>(API_ROUTE.nokiaRichMeeting)

	// TODO: [BACKEND] заменить на фильтрацию по тегам в бекенде
	const meetingTags: NokiaTagType[] = useMemo(() => {
		if (richMeetingList.status !== 'LOADED' || !richMeetingList.data) {
			return []
		}

		return Array.from(
			new Set(richMeetingList.data.map(i => i.type))
		).map((i, idx) => ({
			id: idx as NokiaTagType['id'],
			name: i,
			group: 'main',
		}))
	}, [richMeetingList])

	const [ selectedTag, setSelectedTag ] = useState<NokiaTagType>()

	const filtredMeetings = useMemo(() => {
		if (richMeetingList.status !== 'LOADED' || !richMeetingList.data) {
			return []
		}
		if (!selectedTag) {
			return richMeetingList.data
		}

		return richMeetingList.data.filter(meeting => meeting.type === selectedTag.name)
	}, [richMeetingList.data, selectedTag])

	const handleToggleTagClick = (tag: NokiaTagType) => () => {
		const isAlready = selectedTag && selectedTag.name === tag.name
		setSelectedTag(isAlready ? undefined : tag)
	}

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<TextContainer>
				<h1>Встречи</h1>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={richMeetingList}>
					<EmptyData data={richMeetingList}>
						<MeetingTagList
							tags={meetingTags}
							selectedTag={selectedTag}
							onClick={handleToggleTagClick}
						/>

						<NokiaMeetingList meetings={filtredMeetings} />
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
