import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { ToolIndex } from 'components/tool/tool-index'

export const ToolIndexPage: FunctionComponent = () => {
	usePageTitle('ToolPage')

	return (
		<div className="tool-index-page">
			<TextContainer>
				<h1>Tools</h1>
			</TextContainer>
			<ToolIndex />
		</div>
	)
}
