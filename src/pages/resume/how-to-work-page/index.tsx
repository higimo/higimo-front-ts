import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { BlockRenderer } from './block-renderer/BlockRenderer'

import pageData from './data.json'

import '../resume-style.css'

export const HowToWorkPage: FunctionComponent = () => {
	usePageTitle('Как работаю')

	return (
		<div className="resume-head-page resume-page">
			<Breadcrumps />
			{pageData.blocks.map((block, idx) => (
				<BlockRenderer key={idx} block={block} />
			))}
		</div>
	)
}

export default HowToWorkPage
