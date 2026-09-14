import { TOOL_LINKS } from 'components/tool/tool-index/TOOL_LINKS'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'

// TODO: [LIGHT] Вынести анонсом на страницу сервисов
// TODO: [LIGHT] Проверить, что ещё не опубликовано
export const ToolIndex = () => (
	<IntroTileGallery
		list={TOOL_LINKS}
	/>
)
