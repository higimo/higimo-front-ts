// TODO lazyload
import { Collapse } from 'react-collapse'
import cs from 'classnames'
import { ComponentChild, FunctionComponent } from "preact";
import { useState } from "preact/hooks";

import './style.css'

type CollapseSectionPropsType = {
	header: ComponentChild;
	fold?: boolean;
}
export const CollapseSection: FunctionComponent<CollapseSectionPropsType> = ({ header, children, fold = true }) => {
	const [ folded, setFolded ] = useState(!fold)

	console.log()

	return (
		<div className={cs('collapse-section', { 'collapse-section--unfold': folded })}>
			<div
				onClick={() => setFolded(!folded)}
				className="collapse-section__header"
			>
				{typeof header === 'string' ? <h3>{header}</h3> : {header}}
			</div>
			<Collapse isOpened={folded}>
				{children}
			</Collapse>
		</div>
	)
}