import { FunctionComponent } from 'preact'
import { PasteApiType, PasteStatisticApiType } from 'api-types/paste.types'

import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { HiringResponseCardsGallery } from 'components/hiring-response/hiring-response-cards-gallery'
import { HiringResponseCounter } from 'components/hiring-response/hiring-response-counter'
import { HiringResponseDiagram } from 'components/hiring-response/hiring-response-diagram'
import { HiringResponseLinks } from 'components/hiring-response/hiring-response-links'
import { HiringResponseTodoController } from 'components/hiring-response/hiring-response-todo'
import { HiringTemplateAnswer } from 'components/hiring-response/hiring-template-answer'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

export const HiringResponsePage: FunctionComponent = () => {
	const [ pasteData, fetchUpdate ] = useApi<PasteApiType[]>(API_ROUTE.paste, {
		filter: { key: 'send-resume*' }
	})
	const [ statistic ] = useApi<PasteStatisticApiType[]>(API_ROUTE.pasteStatistic, { key: 'send-resume' })

	const [ pasteTodo ] = useApi<PasteApiType[]>(API_ROUTE.paste, {
		filter: {
			key: 'hiring-todo'
		}
	})

	return (
		<Layout title="Мои отклики" className="hiring-response-page">
			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<h1>Мои отклики</h1>
			</TextContainer>

			<TextContainer>
				<h2>Задачи</h2>
				<p>Можно редактировать</p>
				<LoadSuspense data={pasteTodo}>
					<EmptyData data={pasteTodo}>
						<HiringResponseTodoController todo={pasteTodo.data} />
					</EmptyData>
				</LoadSuspense>
				<HiringResponseLinks />
			</TextContainer>

			<TextContainer>
				<h3>Откликов</h3>
				<LoadSuspense data={pasteData}>
					<EmptyData data={pasteData}>
						<HiringResponseCounter data={pasteData.data} />
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={pasteData}>
					<EmptyData data={pasteData}>
						<HiringTemplateAnswer />
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<h2>График откликов</h2>
				<LoadSuspense data={pasteData}>
					<EmptyData data={pasteData}>
						<HiringResponseDiagram data={statistic.data} />
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<h2>Карточки откликов</h2>
				<span
					className="pseudo-link"
					onClick={fetchUpdate}
				>
					↺ Обновить
				</span>
			</TextContainer>

			<LoadSuspense data={pasteData}>
				<EmptyData data={pasteData}>
					<HiringResponseCardsGallery
						cards={pasteData.data}
						fetchUpdate={fetchUpdate}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
