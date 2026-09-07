import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'

import '../resume-style.css'
import './style.css'

export const ResumeTechProductPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, Tech product manager')

	const pageData2 = useJsonApi<PageJSONData>('/json/resume/resume-tech-product.json')

	if (!pageData2) {
		return <Loading />
	}

	return (
		<div className="resume-tech-product-page resume-page">
			<Breadcrumps />
			{pageData2.blocks.map((block, idx) => (
				<BlockRenderer key={idx} block={block} />
			))}
		</div>
	)
}

export default ResumeTechProductPage
