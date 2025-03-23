import { FunctionComponent } from 'preact'

import useApi, { API_STATUS } from '../../../hook/use-api';

import { Loading } from '../../accord/accord-single';
import { NotFoundData } from '../../ui/not-found-data';

import { API_ROUTE } from '../../../api-route';

import './style.css'

type PronType = {
	code: string;
}

export const PronIndex: FunctionComponent = () => {
	const [ pronList ] = useApi<PronType>(API_ROUTE.pron)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(pronList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === pronList.status && !pronList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="gallery-pron container">
			<button
				className="gallery-pron__btn"
				onClick={() => {pronList.data.forEach(i => window.open(`https://rt.pornhub.com/view_video.php?viewkey=${i.code}`))}}
			>
				Открыть порцию
			</button>
		</div>
	)
}
