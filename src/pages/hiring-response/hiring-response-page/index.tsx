import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { HiringResponseCardsGallery } from 'components/hiring-response/hiring-response-cards-gallery'
import { HiringResponseCounter } from 'components/hiring-response/hiring-response-counter'
import { HiringResponseDiagram } from 'components/hiring-response/hiring-response-diagram'
import { HiringResponseLinks } from 'components/hiring-response/hiring-response-links'
import { HiringResponseTodo } from 'components/hiring-response/hiring-response-todo'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

export const HiringResponsePage: FunctionComponent = () => {
	usePageTitle('Мои отклики')

	// TODO: путь в словарь
	const [ data, fetchUpdate ] = useApi<PasteApiType[]>('/api/v2/paste/', {
		// TODO: добавить сортировку в обратном порядке
		filter: {
			// TODO: реализовать на бекенде
			key: 'send-resume*'
		}
	})

	if (data.status === 'LOADING') {
		return <Loading />
	}
	if (data.status === 'ERROR') {
		return <NotFoundData />
	}

	return (
		<div className="hiring-response-page">
			<TextContainer>
				<Breadcrumps />
				<h1>Мои отклики</h1>
			</TextContainer>

			<TextContainer>
				<HiringResponseTodo />
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
