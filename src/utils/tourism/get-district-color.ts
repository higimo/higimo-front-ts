import { districtVacant } from 'data/tourism/district-vacant'
import { districtVisited } from 'data/tourism/district-visited'

// TODO: [LIGHT] вынести цвета в конфиг
export const getDistrictColor = (iso: any) =>
	districtVisited.includes(iso) ? '#ff4aff' :
		(districtVacant.includes(iso) ? '#5a7bc3' : '#b7b7b7')
