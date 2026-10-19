import { BarPoiRealTags } from 'api-types/tourism.types';
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet';
import { FunctionComponent } from 'preact';

type BarPoiListPropsType = {
	barPoiList: BarPoiRealTags[];
};
export const BarPoiList: FunctionComponent<BarPoiListPropsType> = ({
	barPoiList,
}) => (
	<div className="bar-poi__gallery">
		{barPoiList.map((mapPoint: BarPoiRealTags) => (
			<TourismBarPointSnippet
				key={mapPoint.id}
				{...mapPoint} />
		))}
	</div>
);
