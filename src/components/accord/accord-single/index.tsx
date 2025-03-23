import { FunctionComponent } from 'preact'
import { AccordType } from '../../../types';

import { useMemo } from 'preact/hooks'
import useApi, { API_STATUS } from '../../../hook/use-api';

import { getRandom } from '../../../utils/get-random';

import { NotFoundPage } from '../../../pages/not-found-page';

import { AccordElement } from '../accord-element';
import { TextContainer } from '../../ui/text-container';

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS';
import { API_ROUTE } from '../../../api-route';

import './style.css'

const ALSO_ELEMENTS = 6;

export const Loading = () => {
	return (
		<TextContainer className="loading">
			Загружаю…
		</TextContainer>
	)
}

type AccordSinglePropsType = {
	idcode: string;
}
export const AccordSingle: FunctionComponent<AccordSinglePropsType> = ({ idcode }) => {
	const [ list ] = useApi<AccordType>(API_ROUTE.accord)
	const [ songSingle ] = useApi<AccordType>(API_ROUTE.accordSingle({ idcode }))

	const seeAlsoList = useMemo(
		() => list.data.splice(getRandom(list.data.length - ALSO_ELEMENTS - 1), ALSO_ELEMENTS),
		[idcode, list.data]
	)

	if (
		([API_STATUS.INIT, API_STATUS.LOADING].includes(songSingle.status)) ||
		([API_STATUS.INIT, API_STATUS.LOADING].includes(list.status))) {
		return <Loading />
	}

	if (
		(list.status === API_STATUS.LOADED && !list.data.length) ||
		(songSingle.status === API_STATUS.LOADED && !songSingle.data.length)) {
		return <NotFoundPage />
	}

	document.title = songSingle.data[0].name
	
	return (
		<div className="container accord-single-page">
			<pre>
				{songSingle.data[0].text}
			</pre>
			<div className="backlink">
				<a href={ROUTE_LINKS.accordIndex}>← Назад</a>
			</div>
			<div className="see-also-list">
				{seeAlsoList.map(item => (
					<AccordElement
						{...item}
						isMostView={false}
						isNew={false}
						showAlf={false}
						showBaidge={false}
					/>
				))}
			</div>
		</div>
	)
}
