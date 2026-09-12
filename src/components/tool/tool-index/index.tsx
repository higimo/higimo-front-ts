import { TextContainer } from 'components/ui/text-container'

import { TOOL_LINKS } from './TOOL_LINKS'

// TODO: [LIGHT] Вынести анонсом на страницу сервисов
// TODO: [LIGHT] Удалить страницу /tool/
// TODO: [LIGHT] Проверить, что ещё не опубликовано
export const ToolIndex = () => (
	<TextContainer>
		<h2>Мои тулы, инвентари</h2>
		<ul>
			{TOOL_LINKS.map(item => (
				<li><a href={item.href}>{item.title}</a></li>
			))}
		</ul>
	</TextContainer>
)
