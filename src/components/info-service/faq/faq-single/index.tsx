import { FunctionComponent } from 'preact'
import { FaqType } from '../../../../types';

import { useRoute } from 'preact-iso';
import useApi, { API_STATUS } from '../../../../hook/use-api';

import { NotFoundPage } from '../../../../pages/not-found-page';

import { TextContainer } from '../../../ui/text-container';

import { API_ROUTE } from '../../../../api-route';
import { Loading } from '../../../accord/accord-single';

export const FaqSingle: FunctionComponent = () => {
	const { params: { idcode = ''} } = useRoute()
	const [ faqDetail ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(faqDetail.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === faqDetail.status && !faqDetail.data.length || !idcode.length) {
		return <NotFoundPage />
	}

	document.title = faqDetail.data[0].name

	return (
		<div className="faq-page">
			<TextContainer>
				<h1>{faqDetail.data[0].name}321</h1>
			</TextContainer>
			<TextContainer>
				<div
					className="container"
					dangerouslySetInnerHTML={{__html: faqDetail.data[0].text}}
				/>
			</TextContainer>
		</div>
	)
}
