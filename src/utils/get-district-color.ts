import { districtVacant } from 'components/tourism/tourism-maps-region/districtVacant'
import { districtVisited } from 'components/tourism/tourism-maps-region/districtVisited'

export const getDistrictColor = (iso: any) =>
	districtVisited.includes(iso) ? '#ff4aff' :
		(districtVacant.includes(iso) ? '#5a7bc3' : '#b7b7b7')
