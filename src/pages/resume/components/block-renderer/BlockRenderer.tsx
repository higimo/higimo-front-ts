import { FunctionComponent } from 'preact'
import { AnyBlock } from 'pages/resume/components/block-renderer/types'

import { ListRenderer } from 'pages/resume/components/block-renderer/renrerers/ListRenderer'
import { CollapsibleRenderer } from 'pages/resume/components/block-renderer/renrerers/CollapsibleRenderer'
import { ParagraphRenderer } from 'pages/resume/components/block-renderer/renrerers/ParagraphRenderer'
import { SlideRenderer } from 'pages/resume/components/block-renderer/renrerers/SlideRenderer'
import { InlineLinkRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineLinkRendererProps'
import { InlineTextRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineTextRendererProps'
import { ContactListRenderer } from 'pages/resume/components/block-renderer/renrerers/ContactListRenderer'
import { HeadingRenderer } from 'pages/resume/components/block-renderer/renrerers/HeadingRendererProps'
import { InlineStrongRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineStrongRenderer'
import { TextContainerRenderer } from 'pages/resume/components/block-renderer/renrerers/TextContainerRenderer'
import { ContactInfoRenderer } from 'pages/resume/components/block-renderer/renrerers/ContactInfoRenderer'
import { ExperienceListRenderer } from 'pages/resume/components/block-renderer/renrerers/ExperienceListRenderer'
import { SkillsRenderer } from 'pages/resume/components/block-renderer/renrerers/SkillsRenderer'
import { AboutRenderer } from 'pages/resume/components/block-renderer/renrerers/AboutRenderer'
import { EducationRenderer } from 'pages/resume/components/block-renderer/renrerers/EducationRenderer'
import { InlineSpanRenderer } from 'pages/resume/components/block-renderer/renrerers/InlineSpanRenderer'

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
}

type BlockRendererPropsType = {
	block: any
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
