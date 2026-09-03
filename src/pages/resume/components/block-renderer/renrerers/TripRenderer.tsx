import { FunctionComponent } from 'preact'
import { TripDay } from '../types'

import cs from 'classnames'

import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

export const TripDayRenderer: FunctionComponent<TripDay> = ({
	title,
	events,
}) => (
	<div className="trip-day">
		<TourismHeader secondary>{title}</TourismHeader>
		<div className="trip-day__events">
			{events.map((event, index) => (
				<div key={index} className="trip-day__event">
					{!!event.left && (
						<TourismSecondary
							main
							className="trip-day__left"
							>
							{event.left}
						</TourismSecondary>
					)}
					<TourismSecondary
						main
						className={cs('trip-day__text', {
							'trip-day__text--roadmap': event.type === 'roadmap',
							'trip-day__text--maybe': event.modifier === 'maybe',
							'trip-day__text--teleport': event.type === 'teleport',
							'trip-day__text--night-stay': event.type === 'night',
						})}
					>
						{event.text}
					</TourismSecondary>
				</div>
			))}
		</div>
	</div>
)
