import cs from 'classnames'

import { useState } from 'preact/hooks'

import { ComponentChild, FunctionComponent } from 'preact'

import { lazy, Suspense } from 'preact/compat'

import './style.css'

// TODO: [LIGHT] что он ругается?
const LazyCollapse = lazy(() => import('react-collapse'))

type CollapseSectionPropsType = {
	header: ComponentChild
	fold?: boolean
}
export const CollapseSection: FunctionComponent<CollapseSectionPropsType> = ({ header, children, fold = true }) => {
	const [ folded, setFolded ] = useState(!fold)

	return (
		<div className={cs('collapse-section', { 'collapse-section--unfold': folded })}>
			<div
				onClick={() => setFolded(!folded)}
				className="collapse-section__header"
			>
				{typeof header === 'string' ? <h3>{header}</h3> : header}
			</div>
			<Suspense fallback={<div className="collapse-placeholder" />}>
				<LazyCollapse isOpened={folded}>
					{children}
				</LazyCollapse>
			</Suspense>
		</div>
	)
}
