import { FunctionComponent } from 'preact'
import { ListItemBlock } from 'components/ui/block-renderer/types'

import { ListRenderer } from 'components/ui/block-renderer/renrerers/ListRenderer'

import { replaceRenderBlockVariables } from 'utils/replace-render-block-variables'

import { variablesRenderBlockSignal } from 'context/render-block-variables-signal'

// Это могло быть ListItemBlock, но не смогло
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
