import { FunctionComponent } from 'preact'
import { NokiaMeetingStatisticType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaStatistic } from 'components/nokia/nokia-statistic'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../nokia-style.css'

export const NokiaStatisticPage: FunctionComponent = () => {
	const [ meetingStatisticList ] = useApi<NokiaMeetingStatisticType[]>(API_ROUTE.nokiaStatistic)

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<TextContainer>
				<h1>Статистика</h1>
			</TextContainer>

			<LoadSuspense data={meetingStatisticList}>
				<EmptyData data={meetingStatisticList}>
					<NokiaStatistic
						meetingStatistic={meetingStatisticList.data || []}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
