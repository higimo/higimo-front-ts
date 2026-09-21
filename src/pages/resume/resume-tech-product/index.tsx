import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import '../resume-style.css'
import './style.css'

export const ResumeTechProductPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, Tech product manager')

	const [ data ] = useJsonApi<PageJSONData>('/json/resume/resume-tech-product.json')
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="resume-tech-product-page resume-page">
			<Breadcrumps />

			{(isError
				? (<NotFoundData />)
				: (
					data.data.blocks.map((block, idx) => (
						<BlockRenderer key={idx} block={block} />
					))
				)
			)}
		</div>
	)
}
