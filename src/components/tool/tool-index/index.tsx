import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: [LIGHT] Исправить на карточки, как на главной Tile
// TODO: [LIGHT] Вывести на страницу сервисов, как анонсы
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
