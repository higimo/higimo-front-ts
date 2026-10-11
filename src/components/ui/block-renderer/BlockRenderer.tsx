import { FunctionComponent } from 'preact'
import { AnyBlock } from 'components/ui/block-renderer/types'

import { AboutRenderer } from 'components/ui/block-renderer/renrerers/AboutRenderer'
import { CollapsibleRenderer } from 'components/ui/block-renderer/renrerers/CollapsibleRenderer'
import { ContactInfoRenderer } from 'components/ui/block-renderer/renrerers/ContactInfoRenderer'
import { ContactListRenderer } from 'components/ui/block-renderer/renrerers/ContactListRenderer'
import { EducationRenderer } from 'components/ui/block-renderer/renrerers/EducationRenderer'
import { ExperienceListRenderer } from 'components/ui/block-renderer/renrerers/ExperienceListRenderer'
import { HeadingRenderer } from 'components/ui/block-renderer/renrerers/HeadingRendererProps'
import { InlineLinkRenderer } from 'components/ui/block-renderer/renrerers/InlineLinkRendererProps'
import { InlineSpanRenderer } from 'components/ui/block-renderer/renrerers/InlineSpanRenderer'
import { InlineStrongRenderer } from 'components/ui/block-renderer/renrerers/InlineStrongRenderer'
import { InlineTextRenderer } from 'components/ui/block-renderer/renrerers/InlineTextRendererProps'
import { ListRenderer } from 'components/ui/block-renderer/renrerers/ListRenderer'
import { ParagraphRenderer } from 'components/ui/block-renderer/renrerers/ParagraphRenderer'
import { SkillsRenderer } from 'components/ui/block-renderer/renrerers/SkillsRenderer'
import { SlideRenderer } from 'components/ui/block-renderer/renrerers/SlideRenderer'
import { TextContainerRenderer } from 'components/ui/block-renderer/renrerers/TextContainerRenderer'
import { TripDayRenderer } from 'components/ui/block-renderer/renrerers/TripRenderer'
import { TripSummaryRenderer } from 'components/ui/block-renderer/renrerers/TripSummaryRenderer'


const renderers: Record<AnyBlock['type'], any> = {
	slide: SlideRenderer,
	heading: HeadingRenderer,
	paragraph: ParagraphRenderer,
	list: ListRenderer,
	collapsible: CollapsibleRenderer,
	contactList: ContactListRenderer,
	text: InlineTextRenderer,
	link: InlineLinkRenderer,
	strong: InlineStrongRenderer,
	textContainer: TextContainerRenderer,

	// resume
	contactInfo: ContactInfoRenderer,
	experienceList: ExperienceListRenderer,
	skills: SkillsRenderer,
	about: AboutRenderer,
	education: EducationRenderer,
	span: InlineSpanRenderer,

	// trips
	'trip-day': TripDayRenderer,
	'trip-summary': TripSummaryRenderer
}

type BlockRendererPropsType = {
	block: AnyBlock
}
export const BlockRenderer: FunctionComponent<BlockRendererPropsType> = ({ block }) => {
	// @ts-ignore
	const Renderer = renderers[block.type]
	if (!Renderer) {
		console.warn(`Unknown block type: ${block.type}`)
		return null
	}
	return <Renderer {...block} />
}
