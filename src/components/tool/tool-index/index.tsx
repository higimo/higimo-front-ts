import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: [LIGHT] Вынести анонсом на страницу сервисов
// TODO: [LIGHT] Удалить страницу /tool/
// TODO: [LIGHT] Проверить, что ещё не опубликовано
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
