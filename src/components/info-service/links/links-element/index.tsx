import { FunctionComponent } from 'preact'
import { LinksType } from 'api-types/links.types'

import './style.css'

export const LinksElement: FunctionComponent<LinksType> = ({ url, description }) => (
	<a className="best-link" href={url}>
		<div
			className="best-link__description"
			dangerouslySetInnerHTML={{__html: description}}
		/>
		<div className="best-link__link">
			{url}
		</div>
	</a>
)
