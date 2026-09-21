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

export const HowToWorkPage: FunctionComponent = () => {
	usePageTitle('Как работаю')

	const [ data ] = useJsonApi<PageJSONData>('/json/resume/how-to-work-page.json')
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="resume-head-page resume-page">
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
