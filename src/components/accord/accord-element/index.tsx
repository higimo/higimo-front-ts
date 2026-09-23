import { FunctionComponent } from 'preact'
import { AccordRealTagType } from 'api-types/accord.types'

import { Tag } from 'components/ui/tag'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

let alf = ''

type AccordElementPropsType = AccordRealTagType & {
	showAlf?: boolean
	showBaidge?: boolean
}

export const AccordElement: FunctionComponent<AccordElementPropsType> = ({
	id,
	name,
	tags,
	showAlf = true,
	showBaidge = true
}) => (
	<span>
		{showAlf && name[0] !== alf && <div className="alf">{alf = (name[0] || '')}</div>}
		<div>
			<a className="accord__link" href={ROUTE_LINKS.accordDetail({ idcode: id })}>{name}</a>
			{showBaidge && [
				' ',
				tags.map(tag => (<Tag>{tag.title}</Tag>))
			]}
		</div>
	</span>
)
