import { ComponentChild, FunctionComponent } from 'preact'

import { useToggle } from 'hook/use-toggle'

import { Collapse } from 'components/ui/collapse'

import cs from 'classnames'

import './style.css'

type CollapseSectionPropsType = {
	title: ComponentChild
	fold?: boolean
}

export const CollapseSection: FunctionComponent<CollapseSectionPropsType> = ({
	title,
	children,
	fold = true
}) => {
	const [ folded, foldedToggle ] = useToggle(!fold)

	return (
		<div className={cs('collapse-section', { 'collapse-section--unfold': folded })}>
			<div
				onClick={foldedToggle}
				className="collapse-section__header"
			>
				{typeof title === 'string' ? <h3>{title}</h3> : title}
			</div>
			<Collapse isOpened={folded}>
				{children}
			</Collapse>
		</div>
	)
}
