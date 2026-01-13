import { FunctionComponent } from 'preact';

type CityType = {
	title: string;
	star: string;
}
export const CityStarElement: FunctionComponent<CityType> = (city) => {
	return (
		<div className="city-stars__item">
			<div className="city-stars__title">
				{city.title}
			</div>
			<div className="city-stars__star">
				{city.star}
			</div>
		</div>
	)
}