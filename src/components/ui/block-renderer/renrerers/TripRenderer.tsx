import { FunctionComponent } from 'preact'
import { TripDay } from 'components/ui/block-renderer/types'

import { Heading } from 'components/ui/heading/Heading'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import cs from 'classnames'

export const TripDayRenderer: FunctionComponent<TripDay> = ({
	title,
	events,
}) => (
	<div className="trip-day">
		<Heading variant="tourism" level={2}>{title}</Heading>
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
