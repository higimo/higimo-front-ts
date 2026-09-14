import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ToolIndex } from 'components/tool/tool-index'

export const ToolIndexPage: FunctionComponent = () => {
	usePageTitle('ToolPage')

	return (
		<div className="tool-index-page">
			<TextContainer>
				<h1>Мои тулы, инвентари</h1>
				<ToolIndex />
			</TextContainer>
		</div>
	)
}
