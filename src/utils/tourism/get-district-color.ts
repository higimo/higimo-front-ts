import { districtVacant } from 'data/tourism/district-vacant'
import { districtVisited } from 'data/tourism/district-visited'

import { MAP_DISTRICT_VISITED, MAP_DISTRICT_VACANT, MAP_DISTRICT_DEFAULT } from 'config/MAP-DISTRICT-COLORS'

export const getDistrictColor = (iso: any) =>
	districtVisited.includes(iso) ? MAP_DISTRICT_VISITED :
		(districtVacant.includes(iso) ? MAP_DISTRICT_VACANT : MAP_DISTRICT_DEFAULT)
