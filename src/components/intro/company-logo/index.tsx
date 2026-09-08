import { FunctionComponent } from 'preact'
import { KeyOf } from 'utils.type'

// TODO: [LIGHT] to assets
import als from './img/als.png'
import daily from './img/daily.svg'
import intersection from './img/intersection.svg'
import kidguru from './img/kidgu.ru.svg'
import rtop from './img/rtop.svg'
import sj from './img/sj.png'

import './style.css'

const logoMap = {
	SJ: sj,
	'Афиша Daily': daily,
	ALS: als,
	'R-top': rtop,
	intersection: intersection,
	kidguru: kidguru,
} as const

type NameCompanyType = KeyOf<typeof logoMap>

type CompanyLogoType = {
	name: NameCompanyType
}

export const CompanyLogo: FunctionComponent<CompanyLogoType> = props => (
	<img src={logoMap[props.name]} alt={props.name} class="company-logo" />
)
