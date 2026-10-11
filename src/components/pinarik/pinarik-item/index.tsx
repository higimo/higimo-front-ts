import { PinarikType } from 'api-types/pinarik.types'

import cs from 'classnames'

type PinarikItemPropsType = PinarikType & {
	onClick: () => void
}

export const PinarikItem = (day: PinarikItemPropsType) => (
	<div
		onClick={day.onClick}
		className={cs(
			'pinarik-day',
			{
				'pinarik-day--bad': day.score < 0,
				'pinarik-day--norm': day.score == 0,
				'pinarik-day--good': day.score > 0,
			}
		)}
	/>
)
