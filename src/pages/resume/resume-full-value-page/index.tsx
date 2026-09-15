import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import '../resume-style.css'

export const ResumeProductFullValuePage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, Product owner/manager')

	const [ data ] = useJsonApi<PageJSONData>('/json/resume/resume-full-value-page.json')
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="resume-product2-page resume-page">
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
