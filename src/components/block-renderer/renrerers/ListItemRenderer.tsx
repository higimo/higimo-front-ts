import { FunctionComponent } from 'preact'
import { ListItemBlock } from 'components/block-renderer/types'

import { ListRenderer } from 'components/block-renderer/renrerers/ListRenderer'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'components/stores/render-block-variables-store'

type ListItemRendererPropsType = {
	item: ListItemBlock
}

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
