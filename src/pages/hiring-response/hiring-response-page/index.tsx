import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { HiringResponseCardsGallery } from 'components/hiring-response/hiring-response-cards-gallery'
import { HiringResponseCounter } from 'components/hiring-response/hiring-response-counter'
import { HiringResponseDiagram } from 'components/hiring-response/hiring-response-diagram'
import { HiringResponseLinks } from 'components/hiring-response/hiring-response-links'
import { HiringResponseTodoController } from 'components/hiring-response/hiring-response-todo'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

export const HiringResponsePage: FunctionComponent = () => {
	usePageTitle('Мои отклики')

	const [ data, fetchUpdate ] = useApi<PasteApiType[]>(API_ROUTE.paste, {
		filter: {
			// TODO: [BACKEND] реализовать на бекенде
			key: 'send-resume*'
		}
	})

	if (data.status === 'LOADING') {
		return <Loading />
	}
	if (data.status === 'ERROR') {
		return <NotFoundPage />
	}

	return (
		<div className="hiring-response-page">
			<TextContainer>
				<Breadcrumps />
				<h1>Мои отклики</h1>
			</TextContainer>

			<TextContainer>
				<HiringResponseTodoController />
				<HiringResponseLinks />
				<HiringResponseCounter data={data.data} />
				<HiringResponseDiagram data={data.data} />
			</TextContainer>

			<TextContainer>
				<h2>Карточки откликов</h2>
			</TextContainer>
			<HiringResponseCardsGallery
				cards={data.data}
				fetchUpdate={fetchUpdate}
			/>
		</div>
	)
}
