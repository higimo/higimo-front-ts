import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

type LayoutPropsType = ClassNameType & {
	title?: string
}

export const Layout: FunctionComponent<LayoutPropsType> = (props) => {
	usePageTitle(props.title || '')

	return (
		<div className={props.className}>
			{props.children}
		</div>
	)
}
