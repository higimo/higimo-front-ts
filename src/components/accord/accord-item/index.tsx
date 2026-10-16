import { FunctionComponent } from 'preact'
import { AccordRealTagType, AccordType } from 'api-types/accord.types'

import { Tag } from 'components/ui/tag'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

let alf = ''

type AccordItemPropsType = (Omit<AccordRealTagType, 'tags'> | AccordType) & {
	tags?: AccordRealTagType['tags']
	showAlf?: boolean
	showBaidge?: boolean
}

export const AccordItem: FunctionComponent<AccordItemPropsType> = ({
	id,
	name,
	tags = [],
	showAlf = true,
	showBaidge = true
}) => (
	<span>
		{showAlf && name[0] !== alf && <div className="alf">{alf = (name[0] || '')}</div>}
		<div>
			<a className="accord__link" href={ROUTE_LINK.accordDetail({ idcode: id })}>{name}</a>
			{showBaidge && [
				' ',
				tags.map(tag => (<Tag key={tag.id}>{tag.title}</Tag>))
			]}
		</div>
	</span>
)
