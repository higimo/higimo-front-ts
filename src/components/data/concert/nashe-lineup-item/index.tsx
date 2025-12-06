import { useRoute } from 'preact-iso'
import { useMemo } from 'preact/hooks'
import useApi from 'hook/use-api';
import { useLoadingState } from 'hook/use-loading-state';
import { useEmptyDataState } from 'hook/use-empty-data-state';

import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container';

import { NotFoundPage } from 'pages/not-found-page';

import { API_ROUTE } from 'dic/api-route';

import './style.css'

type NasheType = {
	id: number;
	name: string;
	time: number; // date
	scene: number;
	visit: number,
	year: number; // year
}

export const NasheLineupItem = () => {
	const { params: { year } } = useRoute()
	const curYear = year ? parseInt(year, 10) : 2017

	const [ nasheFullData ] = useApi<NasheType>(API_ROUTE.nasheSingle({ year }))
	const { mainScene, secondScene } = useMemo<{ mainScene: NasheType[], secondScene: NasheType[] }>(() => {
		const filtredNasheLineup = nasheFullData.data.filter(nasheElement => {
			return new Date(nasheElement.time).getFullYear() == curYear
		})

		const mainScene = filtredNasheLineup.filter(i => i.scene === 1)
			.sort((left, right) => left.time - right.time)

		const secondScene = filtredNasheLineup.filter(i => i.scene != 1)
			.sort((left, right) => left.time - right.time)

		return { mainScene, secondScene }

	}, [nasheFullData.data, curYear])

	const isLoading = useLoadingState([nasheFullData.status])
	const isListEmpty = useEmptyDataState(nasheFullData.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundPage />
	}

	document.title = document.title = `Нашествие ${curYear}`

	let day = null
	return (
		<div className="nashe-lineup">
			<TextContainer>
				<h1>Нашествие {year}</h1>
				<p>
					★ — посетил
				</p>
			</TextContainer>
			<TextContainer>
				<h2>Главная сцена</h2>
				<table className="line-up">
					<tbody>
						{mainScene.map(({ time, name, visit }) => (
							<tr>
								<td className="date">{day !== new Date(time).getDate() ? day = new Date(time).getDate() : ''}</td>
								<td className="time">{new Date(time).toTimeString().substr(0, 5)}</td>
								<td className="artist-name">{visit ? '★' : null} {name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</TextContainer>
			<TextContainer>
				<h2>Сцена 2.0</h2>
				<table className="line-up">
					<tbody>
						{secondScene.map(({ time, name, visit }) => (
							<tr>
								<td className="date">{day !== new Date(time).getDate() ? day = new Date(time).getDate() : ''}</td>
								<td className="time">{new Date(time).toTimeString().substr(0, 5)}</td>
								<td className="artist-name">{visit ? '★' : null} {name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</TextContainer>
		</div>
	)
}
