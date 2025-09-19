import { useContext, useLayoutEffect } from 'preact/hooks'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../nokia-style.css'
import { NokiaContext, NokiaContextType } from 'context/nokia'

export const NokiaIndex = () => {
	const { meeting, fetchData } = useContext(NokiaContext) as NokiaContextType

	useLayoutEffect(fetchData, [])

	return (
		<div className="meeting-gallery">
			{meeting.slice(0, 200).map(item => (
				<div className={`meeting-gallery__item meeting type-${item.type}`}>
					<div className="meeting__description">
						{item.description}
					</div>
					<div className="meeting__information">
						<div className="meeting__date">
							{new Date(item.date * 1000).toLocaleDateString()}
						</div>
						<div className="meeting__type">
							<a href={ROUTE_LINKS.nokiaFormEdit({ meetingId: item.id.toString() })}>{item.type}</a>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
