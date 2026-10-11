import { DISTRICT_VACANT } from 'data/tourism/district-vacant'
import { DISTRICT_VISITED } from 'data/tourism/district-visited'

import { MAP_DISTRICT_VISITED, MAP_DISTRICT_VACANT, MAP_DISTRICT_DEFAULT } from 'config/MAP-DISTRICT-COLORS'

export const getDistrictColor = (iso: any) =>
	DISTRICT_VISITED.includes(iso) ? MAP_DISTRICT_VISITED :
		(DISTRICT_VACANT.includes(iso) ? MAP_DISTRICT_VACANT : MAP_DISTRICT_DEFAULT)
