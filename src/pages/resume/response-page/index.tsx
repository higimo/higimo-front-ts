import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'

import '../resume-style.css'
import './style.css'
import { TextContainer } from 'components/ui/text-container'
import useApi from 'hook/use-api'
import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'
import { HiringResponseCounter } from './components/hiring-response-counter'
import { PasteApiType } from './types'
import { HiringResponseLinks } from './components/hiring-response-links'
import { HiringResponseTodo } from './components/hiring-response-todo'
import { HiringResponseDiagram } from './components/hiring-response-diagram'
import { HiringResponseCardsGallery } from './components/hiring-response-cards-gallery'
import { useCallback } from 'preact/hooks'

export const PesponsePage: FunctionComponent = () => {
	usePageTitle('Отклики')

	// TODO: путь в словарь
	const [ data, fetchUpdate ] = useApi<PasteApiType[]>('/api/v2/paste/', {
		// TODO: добавить сортировку в обратном порядке
		filter: {
			// TODO: реализовать на бекенде
			key: 'send-resume*'
		}
	})

	const onCreateCard = useCallback(() => {
		fetchUpdate()
	}, [fetchUpdate])

	if (data.status === 'LOADING') {
		return <Loading />
	}
	if (data.status === 'ERROR') {
		return <NotFoundData />
	}

	return (
		<div className="pesponse-page">
			<TextContainer>
				<Breadcrumps />
				<h1>Мои отклики</h1>

				<HiringResponseTodo />
				<HiringResponseCounter data={data.data} />
				<HiringResponseDiagram data={data.data} />
				<HiringResponseCardsGallery
					cards={data.data}
					onCreateCard={onCreateCard}
				/>
				<HiringResponseLinks />
			</TextContainer>
		</div>
	)
}
