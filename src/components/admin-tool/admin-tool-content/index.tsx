import { FunctionComponent } from 'preact'

export const AdminToolContent: FunctionComponent<{ response: Object | undefined }> = ({
	response,
}) => (
	<div className="tool-page__content">
		<pre>
			{response && JSON.stringify(response, null, '\t')}
		</pre>
	</div>
)
