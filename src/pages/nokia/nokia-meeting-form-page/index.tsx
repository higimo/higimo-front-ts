import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType, NokiaPersonType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMeetingForm } from 'components/nokia/form/nokia-meeting-form'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { getUserSuggestions } from 'utils/get-user-suggestions'
import { ifTitle } from 'utils/if-title'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../nokia-style.css'

export const NokiaMeetingFormPage: FunctionComponent = () => {
	const { params: { meetingId = DEFAULT_ID } } = useRoute()

	const [ meetingItem ] = useApi<NokiaMeetingFullType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	// TODO: [BACKEND] на беке получать сортируя по популярности
	const [ personList ] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaSuggestPerson)
	// TODO: [BACKEND] получать самых популярных за последние пол года
	const [ topPersonList ] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaTopPerson)

	const personSuggestList = useMemo(() => {
		if (!personList.data) {
			return []
		}
		return getUserSuggestions(personList.data)
	}, [personList.data])

	const meetingPersons = meetingItem.data?.person ?? []
	const meeting = meetingItem.data
		? (({ person: _, ...rest }) => rest)(meetingItem.data)
		: undefined

	const title = ifTitle(meetingId, 'Создание встречи', 'Редактирование встречи')

	return (
		<Layout title={`${title} | Нокиа`} className="nokia">
			<NokiaMenu />

			<TextContainer>
				<h1>{title}</h1>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={[meetingItem, personList, topPersonList]}>
					<EmptyData data={[meetingItem, personList, topPersonList]} skipEmpty>
						<NokiaMeetingForm
							key={meetingItem.data?.id ?? DEFAULT_ID}
							initialMeeting={meeting}
							initialPersons={meetingPersons}
							personSuggestList={personSuggestList}
							topPersonList={topPersonList.data}
							personList={personList.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
