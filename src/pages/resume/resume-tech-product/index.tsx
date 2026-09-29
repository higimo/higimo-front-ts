import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import '../resume-style.css'
import './style.css'

export const ResumeTechProductPage: FunctionComponent = () => {
	const [ data ] = useJsonApi<PageJSONData>('/json/resume/resume-tech-product.json')

	return (
		<Layout title="Дмитрий Уткин, Tech product manager" className="resume-tech-product-page resume-page">
			<Breadcrumps />

			<LoadSuspense data={data}>
				<EmptyData data={data}>
					{data.data.blocks.map((block, idx) => (
						<BlockRenderer key={idx} block={block} />
					))}
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
