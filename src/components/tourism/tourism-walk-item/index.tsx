import { FunctionComponent } from "preact"
import { YaMapType } from 'types'

type TourismWalkItemPropsType = {
	map: YaMapType['map'];
}
export const TourismWalkItem: FunctionComponent<TourismWalkItemPropsType> = ({ map }) => {
	return (
		<div className="walk">
			<iframe
				src={`https://yandex.ru/map-widget/v1/?um=${map}`}
				style="width: 90vw; height: 90vh;"
				frameborder="0"
			/>
		</div>
	)
}
