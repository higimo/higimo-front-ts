import { TextContainer } from 'components/ui/text-container';
import { FunctionComponent } from 'preact';

export const TypographicHeader: FunctionComponent = (props) => (
	<TextContainer style="margin-top: 256px;">
		<h2>{props.children}</h2>
	</TextContainer>
);
