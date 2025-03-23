import { FunctionComponent } from 'preact';

import useApi, { API_STATUS } from '../../../hook/use-api';

import { TextContainer } from '../../ui/text-container';
import { Loading } from '../../accord/accord-single';
import { TableGameType } from '../../../types';
import { NotFoundData } from '../../ui/not-found-data';

import { API_ROUTE } from '../../../api-route';

import './style.css'

export const TableGame: FunctionComponent = () => {
	const [ games ] = useApi<TableGameType>(API_ROUTE.tableGame)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(games.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === games.status && !games.data.length) {
		return <NotFoundData />
	}

	return (
		<TextContainer>
			{games.data.map(({ id, name, text }) => (
				<div key={id} className="game-gallery__item">
					<div className="game-gallery__name">{name}</div>
					<div className="game-gallery__text">{text}</div>
				</div>
			))}
		</TextContainer>
	)
}
