import { FunctionComponent } from 'preact'
import { AnyBlock } from 'pages/resume/components/block-renderer/types'

import { AboutRenderer } from 'pages/resume/components/block-renderer/renrerers/AboutRenderer'
import { CollapsibleRenderer } from 'pages/resume/components/block-renderer/renrerers/CollapsibleRenderer'
import { ContactInfoRenderer } from 'pages/resume/components/block-renderer/renrerers/ContactInfoRenderer'
import { ContactListRenderer } from 'pages/resume/components/block-renderer/renrerers/ContactListRenderer'
import { EducationRenderer } from 'pages/resume/components/block-renderer/renrerers/EducationRenderer'
import { ExperienceListRenderer } from 'pages/resume/components/block-renderer/renrerers/ExperienceListRenderer'
import { HeadingRenderer } from 'pages/resume/components/block-renderer/renrerers/HeadingRendererProps'
import { InlineLinkRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineLinkRendererProps'
import { InlineSpanRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineSpanRenderer'
import { InlineStrongRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineStrongRenderer'
import { InlineTextRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineTextRendererProps'
import { ListRenderer } from 'pages/resume/components/block-renderer/renrerers/ListRenderer'
import { ParagraphRenderer } from 'pages/resume/components/block-renderer/renrerers/ParagraphRenderer'
import { SkillsRenderer } from 'pages/resume/components/block-renderer/renrerers/SkillsRenderer'
import { SlideRenderer } from 'pages/resume/components/block-renderer/renrerers/SlideRenderer'
import { TextContainerRenderer } from 'pages/resume/components/block-renderer/renrerers/TextContainerRenderer'
import { TripDayRenderer } from 'pages/resume/components/block-renderer/renrerers/TripRenderer'
import { TripSummaryRenderer } from 'pages/resume/components/block-renderer/renrerers/TripSummaryRenderer'


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
