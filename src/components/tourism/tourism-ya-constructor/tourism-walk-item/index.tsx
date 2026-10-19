import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

type TourismWalkItemPropsType = {
	map: YaMapType['map']
}

export const TourismWalkDetail: FunctionComponent<TourismWalkItemPropsType> = ({ map }) => (
	<div className="walk">
		<iframe
			src={`https://yandex.ru/map-widget/v1/?um=${map}`}
			style="width: 90vw; height: 90vh;"
		/>
	</div>
)
