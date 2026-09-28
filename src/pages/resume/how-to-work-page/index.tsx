import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import '../resume-style.css'

export const HowToWorkPage: FunctionComponent = () => {
	const [ data ] = useJsonApi<PageJSONData>('/json/resume/how-to-work-page.json')

	return (
		<Layout title="Как работаю">
			<div className="resume-head-page resume-page">
				<Breadcrumps />

				<LoadSuspense data={data}>
					<EmptyData data={data}>
						{data.data.blocks.map((block, idx) => (
							<BlockRenderer key={idx} block={block} />
						))}
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
