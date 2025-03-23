import {
	YMaps,
	Map,
	ObjectManager,
} from 'react-yandex-maps'

// TODO вынести в отдельный файл
export const TourismMapsMany = () => (
	<YMaps query={{ lang: 'ru_RU' }}>
		<Map
			width='500px'
			height='500px'
			defaultState={{
				center: [55.751574, 37.573856],
				zoom: 9,
			}}
		>
			<ObjectManager
				options={{
					clusterize: true,
					gridSize: 32,
				}}
				objects={{
					openBalloonOnClick: true,
					preset: 'islands#greenDotIcon',
				}}
				clusters={{
					preset: 'islands#redClusterIcons',
				}}
				features={{
					"type": "FeatureCollection",
					"features": [
						{
							"type": "Feature",
							"id": 0,
							"geometry": {
								"type": "Point",
								"coordinates": [55.831903, 37.411961]
							},
							"properties": {
								"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
								"balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
								"balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
								"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
								"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
							}
						},
						{
							"type": "Feature",
							"id": 1,
							"geometry": {
								"type": "Point",
								"coordinates": [55.763338, 37.565466]
							},
							"properties": {
								"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
								"balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
								"balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
								"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
								"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
							}
						},
						{
							"type": "Feature",
							"id": 2,
							"geometry": {
								"type": "Point",
								"coordinates": [55.763338, 37.565468]
							},
							"properties": {
								"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
								"balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
								"balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
								"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
								"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
							}
						},
						{
							"type": "Feature",
							"id": 3,
							"geometry": {
								"type": "Point",
								"coordinates": [55.744522, 37.616378]
							},
							"properties": {
								"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
								"balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
								"balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
								"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
								"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
							}
						}
					]
				}}
				modules={[
					'objectManager.addon.objectsBalloon',
					'objectManager.addon.objectsHint',
				]}
			/>
		</Map>
	</YMaps>
)
