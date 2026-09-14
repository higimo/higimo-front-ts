import { IntroTileGallery } from 'components/intro/intro-tile-gallery'

import { TOOL_LINKS } from 'dic/intra-links/TOOL_LINKS'

// TODO: [LIGHT] Вынести анонсом на страницу сервисов
// TODO: [LIGHT] Проверить, что ещё не опубликовано
export const ToolIndex = () => (
	<IntroTileGallery
		list={TOOL_LINKS}
	/>
)
