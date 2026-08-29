import { AnyBlock } from './types'

import { ListRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/ListRenderer'
import { CollapsibleRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/CollapsibleRenderer'
import { ParagraphRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/ParagraphRenderer'
import { SlideRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/SlideRenderer'
import { InlineLinkRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/InlineLinkRendererProps'
import { InlineTextRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/InlineTextRendererProps'
import { ContactListRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/ContactListRenderer'
import { HeadingRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/HeadingRendererProps'
import { InlineStrongRenderer } from 'pages/resume/how-to-work-page/block-renderer/renrerers/InlineStrongRenderer'

const renderers: Record<AnyBlock['type'], any> = {
	slide: SlideRenderer,
	heading: HeadingRenderer,
	paragraph: ParagraphRenderer,
	list: ListRenderer,
	collapsible: CollapsibleRenderer,
	contactList: ContactListRenderer,
	text: InlineTextRenderer,
	link: InlineLinkRenderer,
	strong: InlineStrongRenderer
}

export function BlockRenderer({ block }: { block: any }) {
	// @ts-ignore
	const Renderer = renderers[block.type]
	if (!Renderer) {
		console.warn(`Unknown block type: ${block.type}`)
		return null
	}
	return <Renderer {...block} />
}
