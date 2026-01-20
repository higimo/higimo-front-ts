import { FunctionComponent } from 'preact'
import { AccordModeType } from 'types'

import { Tag } from 'components/ui/tag'
import { filterMapping } from 'components/accord/utils'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

let alf = ''

const TAG_LABELS: Record<string, string> = {
	liric: 'лирика',
	scream: 'поорать',
	korol: 'Король и шут',
	funny: 'смешное',
	rap: 'речитатив',
	old: 'Старинное',
	ussr: 'СССР',
	lacky: 'зайдёт',
	newschool: 'ньюскул',
	bard: 'барды',
}

type AccordElementPropsType = Pick<AccordModeType, 'id' | 'name' | 'isMostView' | 'isNew' | 'view'> & {
	showAlf?: boolean;
	showBaidge?: boolean;
}

export const AccordElement: FunctionComponent<AccordElementPropsType> = ({ 
	id, 
	name, 
	isMostView, 
	isNew, 
	view, 
	showAlf = true, 
	showBaidge = true 
}) => (
	<span>
		{showAlf && name[0] !== alf && <div className="alf">{alf = name[0]}</div>}
		<div>
			<a className="accord__link" href={ROUTE_LINKS.accordDetail({ idcode: id.toString() })}>{name}</a>
			{' '}
			{showBaidge && [
				isMostView && <Tag>популярно ({view})</Tag>,
				isNew && <Tag>нью</Tag>,
				...Object.entries(filterMapping).map(([key, fn]) => 
					fn({ id }) && TAG_LABELS[key] && <Tag>{TAG_LABELS[key]}</Tag>
				)
			].filter(Boolean).flatMap(i => [i, ' '])}
		</div>
	</span>
)