import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/ui/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { BlockRenderer } from 'components/ui/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import '../resume-style.css'

export const ResumeProductFullDetailPage: FunctionComponent = () => {
	const [ blockListJsonData ] = useJsonApi<PageJSONData>('/json/resume/resume-full-value-page.json')

	return (
		<Layout title="Дмитрий Уткин, Product owner/manager" className="resume-product2-page resume-page">
			<Breadcrumps />

			<LoadSuspense data={blockListJsonData}>
				<EmptyData data={blockListJsonData}>
					{blockListJsonData.data && blockListJsonData.data.blocks.map((block, key) => (
						<BlockRenderer key={key} block={block} />
					))}
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
