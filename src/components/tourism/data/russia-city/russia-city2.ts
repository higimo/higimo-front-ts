import { PovType } from 'components/tourism/data/types'

import { ADM_ORKUG_MOSCOW } from './admOrkugMoscow'
import { COUNTRY } from './country'
import { DISTRICT_MOSCOW } from './districtMoscow'
import { SUBJECT_FEDERATION } from './subjectFederation'
import { TOWN_MOSCOW } from './townMoscow'
import { CASTLE } from './castle'
import { BUILD } from './build'
import { TEATRE } from './teatre'
import { LANDMARK } from './landmark'
import { CHURCH } from './church'
import { MEMORIAL } from './memorial'
import { TOWN } from './town'
import { PLACEFIELD } from './placefield'

// https://query.wikidata.org/

export const russiaCity: PovType[] = ([] as PovType[])
	.concat(TOWN)
	.concat(TOWN_MOSCOW)
	.concat(DISTRICT_MOSCOW)
	.concat(ADM_ORKUG_MOSCOW)
	.concat(SUBJECT_FEDERATION)
	.concat(COUNTRY)
	.concat(CASTLE)
	.concat(BUILD)
	.concat(TEATRE)
	.concat(LANDMARK)
	.concat(CHURCH)
	.concat(MEMORIAL)
	.concat(PLACEFIELD)
