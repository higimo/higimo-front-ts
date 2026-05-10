import { FunctionComponent } from 'preact';

export const AdminToolContent: FunctionComponent<{ response: string; }> = ({ response }) => {
	return (
		<div className="tool-page__content">
			<pre dangerouslySetInnerHTML={{ __html: response }} />
		</div>
	);
};
