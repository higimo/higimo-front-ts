import { LectionType } from 'api-types/lection.types'
import { FunctionComponent } from 'preact'

import markdownit from 'markdown-it'

import { TextContainer } from 'components/ui/text-container'

var md = new markdownit({
	html: true,
	linkify: true,
	typographer: true
})

type ObuchenieSinglePropsType = {
	lection: LectionType
}
export const ObuchenieSingle: FunctionComponent<ObuchenieSinglePropsType> = ({ lection }) => (
	<div className="test">
		<TextContainer>
			<h1>{lection.name}</h1>
		</TextContainer>
		<TextContainer>
			<div
				className="container"
				dangerouslySetInnerHTML={{__html: md.render(lection.text || '')}}
			/>
		</TextContainer>
	</div>
)
