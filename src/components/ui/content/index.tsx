import { FunctionComponent } from 'preact'

export const Content: FunctionComponent = (props) => (
	<pre>
		{JSON.stringify(props, null, '\t')}
	</pre>
)
