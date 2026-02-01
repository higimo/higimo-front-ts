import { useContext, useLayoutEffect } from 'preact/hooks'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../nokia-style.css'

export const NokiaIndex = () => {
	const { richMeeting, fetchData } = useContext(NokiaContext) as NokiaContextType

	useLayoutEffect(fetchData, [])

	return (
		<div className="meeting-gallery">
			{richMeeting.map(item => (
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
					<div className="meeting__person-gallery">
						{item.person.map(person => (
							<div className="meeting__person-name">
								{person.name}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
