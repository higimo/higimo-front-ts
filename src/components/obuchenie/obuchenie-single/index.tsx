import { LectionType } from 'types'

import markdownit from 'markdown-it'

import useApi, { API_STATUS } from 'hook/use-api'
import { useRoute } from 'preact-iso'

import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'
import { NotFoundPage } from 'pages/not-found-page'
import { API_ROUTE } from 'dic/api-route'

export const ObuchenieSingle = () => {
	const { params: { idcode } } = useRoute()
	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode }))

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(lectionDetail.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === lectionDetail.status && !lectionDetail.data.length) {
		return <NotFoundPage />
	}

	document.title = lectionDetail.data[0].name

	var md = new markdownit({
		html: true,
		linkify: true,
		typographer: true
	})

	return (
		<div className="test">
			<TextContainer>
				<h1>{lectionDetail.data[0].name}</h1>
			</TextContainer>
			<TextContainer>
				<div
					className="container"
					dangerouslySetInnerHTML={{__html: md.render(lectionDetail.data[0].text || '')}}
				/>
			</TextContainer>
		</div>
	)
}
