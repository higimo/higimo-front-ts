import { FunctionComponent } from 'preact'
import { ListItem } from '../types'
import { ListRenderer } from './ListRenderer'
import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'
import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

type ListItemRendererPropsType = {
	item: ListItem
}

// TODO: [LIGHT] добавить replaceRenderBlockVariables в другие рендереры
export const ListItemRenderer: FunctionComponent<ListItemRendererPropsType> = ({ item }) => (
	<li>
		<span
			dangerouslySetInnerHTML={{
				__html: replaceRenderBlockVariables(item.text, variablesRenderBlockSignal.value)
			}}
		/>
		{item.children && item.children.map((child, idx) => (
			<ListRenderer key={idx} {...child} />
		))}
	</li>
)
