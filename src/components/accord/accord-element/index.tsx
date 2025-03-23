import { FunctionComponent } from "preact"
import { AccordModeType } from "../../../types"

import { Baidge, BAIDGE_COLOR } from "../../ui/baidge/Baidge"

import { filterKey, filterMapping } from "../utils"

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

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
            {showBaidge ? [
                isMostView && <Baidge color={BAIDGE_COLOR.yellow}>популярно ({view})</Baidge>,
                isNew && <Baidge color={BAIDGE_COLOR.green}>нью</Baidge>,
                filterMapping[filterKey.liric]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>лирика</Baidge>,
                filterMapping[filterKey.scream]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>поорать</Baidge>,
                filterMapping[filterKey.korol]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>Король и шут</Baidge>,
                filterMapping[filterKey.funny]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>смешное</Baidge>,
                filterMapping[filterKey.rap]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>речитатив</Baidge>,
                filterMapping[filterKey.old]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>Старинное</Baidge>,
                filterMapping[filterKey.ussr]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>СССР</Baidge>,
                filterMapping[filterKey.lacky]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>зайдёт</Baidge>,
                filterMapping[filterKey.newschool]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>ньюскул</Baidge>,
                filterMapping[filterKey.bard]({ id }) && <Baidge color={BAIDGE_COLOR.blue}>барды</Baidge>,
            ].filter(Boolean).map(i => ([i, ' '])) : null}
        </div>
    </span>
)