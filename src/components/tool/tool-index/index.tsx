import { TextContainer } from "../../ui/text-container"

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS"

export const ToolIndex = () => (
	<TextContainer>
		<h2>Мои тулы, инвентари</h2>
		<ul>
			<li><a href={ROUTE_LINKS.toolEmailer}>Эмайлер</a></li>
			<li><a href={ROUTE_LINKS.toolComoji}>Комоджики</a></li>
			<li><a href={ROUTE_LINKS.toolMagic}>Волшебный шар</a></li>
			<li><a href={ROUTE_LINKS.petProject}>Пет-проекты</a></li>
		</ul>
	</TextContainer>
)
