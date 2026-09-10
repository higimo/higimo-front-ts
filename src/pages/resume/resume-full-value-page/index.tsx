import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'

import '../resume-style.css'
import './style.css'

// Ого, нигде не используется
// TODO: [LIGHT] По-разному называется?
// TODO: [LIGHT] Добавить в скрытое в ResumeIndexPage
export const ResumeProduct2Page: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, Product owner/manager')

	const pageData2 = useJsonApi<PageJSONData>('/json/resume/resume-full-value-page.json')

	if (!pageData2) {
		return <Loading />
	}

	return (
		<div className="resume-product2-page resume-page">
			<Breadcrumps />
			{pageData2.blocks.map((block, idx) => (
				<BlockRenderer key={idx} block={block} />
			))}
		</div>
	)
}

export default ResumeProduct2Page
