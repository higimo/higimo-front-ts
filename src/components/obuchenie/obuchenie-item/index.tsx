import { LectionType } from 'api-types/lection.types'
import { FunctionComponent } from 'preact'

import markdownit from 'markdown-it'

import { TextContainer } from 'components/ui/text-container'

var md = new markdownit({
	html: true,
	linkify: true,
	typographer: true
})

type ObuchenieItemPropsType = {
	lectionItem: LectionType | null
}

export const ObuchenieItem: FunctionComponent<ObuchenieItemPropsType> = ({ lectionItem }) => lectionItem && (
	<div className="test">
		<TextContainer>
			<h1>{lectionItem.name}</h1>
		</TextContainer>
		<TextContainer>
			<div
				className="container"
				dangerouslySetInnerHTML={{__html: md.render(lectionItem.text || '')}}
			/>
		</TextContainer>
	</div>
)
