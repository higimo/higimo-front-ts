import { LectionType } from '../../../types'

import markdownit from 'markdown-it'

import useApi, { API_STATUS } from '../../../hook/use-api'
import { useRoute } from 'preact-iso'

import { NotFoundPage } from '../../../pages/not-found-page'

import { TextContainer } from '../../ui/text-container'
import { Loading } from '../../accord/accord-single'

import { API_ROUTE } from '../../../api-route'
import { useEffect, useState } from 'preact/hooks'

export const ObuchenieSingle = () => {
	const { params: { idcode } } = useRoute()
	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode }))
	const [markdownIt, setMarkdownIt] = useState<typeof import('markdown-it') | null>(null);

	useEffect(() => {
		import(/* webpackChunkName: "markdown-it" */ 'markdown-it').then((module) => {
			setMarkdownIt(module.default);
		});
	}, []);
			
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
