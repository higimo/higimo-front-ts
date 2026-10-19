import { LectionType } from 'api-types/lection.types';
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK';
import { FunctionComponent } from 'preact';

type ObuchenieItemPropsType = LectionType;
export const ObuchenieItem: FunctionComponent<ObuchenieItemPropsType> = ({
	id, name, code,
}) => (
	<a
		key={id}
		href={ROUTE_LINK.learningDetail({ idcode: code })}
		className="obuchenie-list__element"
	>
		<div className="obuchenie-list__name">
			{name}
		</div>
	</a>
);
