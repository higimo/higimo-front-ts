import { FunctionComponent } from "preact"
import { AccordModeType } from "../../../types"

import { filterKey, filterMapping } from "../utils"

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { Tag } from "components/ui/tag"

let alf = ''
type AccordElementPropsType = Pick<AccordModeType, 'id' | 'name' | 'isMostView' | 'isNew' | 'view'> & {
	showAlf?: boolean;
	showBaidge?: boolean;
}
export const AccordElement: FunctionComponent<AccordElementPropsType> = ({ id, name, isMostView, isNew, view, showAlf = true, showBaidge = true }) => (
	<span key={name}>
		{showAlf ? ((name[0] !== alf) ? (<div className="alf">{alf = name[0]}</div>) : null) : null}
		<div>
			<a className="accord__link" href={ROUTE_LINKS.accordDetail({ idcode: id.toString() })}>{name}</a>
			{' '}
			{showBaidge ? [
				isMostView && <Tag>популярно ({view})</Tag>,
				isNew && <Tag>нью</Tag>,
				filterMapping[filterKey.liric]({ id }) && <Tag>лирика</Tag>,
				filterMapping[filterKey.scream]({ id }) && <Tag>поорать</Tag>,
				filterMapping[filterKey.korol]({ id }) && <Tag>Король и шут</Tag>,
				filterMapping[filterKey.funny]({ id }) && <Tag>смешное</Tag>,
				filterMapping[filterKey.rap]({ id }) && <Tag>речитатив</Tag>,
				filterMapping[filterKey.old]({ id }) && <Tag>Старинное</Tag>,
				filterMapping[filterKey.ussr]({ id }) && <Tag>СССР</Tag>,
				filterMapping[filterKey.lacky]({ id }) && <Tag>зайдёт</Tag>,
				filterMapping[filterKey.newschool]({ id }) && <Tag>ньюскул</Tag>,
				filterMapping[filterKey.bard]({ id }) && <Tag>барды</Tag>,
			].filter(Boolean).map(i => ([i, ' '])) : null}
		</div>
	</span>
)