import { Brand, Code } from 'utils.type'

type YaMapId = Brand<number, 'YaMapId'>

export type YaMapType = {
	id: YaMapId
	name: string
	code: Code
	map: string
}

export type YaMapPropertyType = {
	/**
	 * содержимое иконки геообъекта
	 */
	iconContent?: string
	/**
	 * подпись иконки геообъекта
	 */
	iconCaption?: string
	/**
	 * содержимое всплывающей подсказки геообъекта
	 */
	hintContent?: string
	/**
	 * содержимое заголовка балуна геообъекта
	 */
	balloonContentHeader?: string
	/**
	 * содержимое основой части балуна
	 * можно html в string
	 */
	balloonContentBody?: string
	/**
	 * содержимое нижней части балуна
	 * сереньким снизу, можно html в string
	 */
	balloonContentFooter?: string
}

type YaMapPresetType =
	/* С чиселками и хвостиком */
	| 'islands#blueIcon'
	| 'islands#darkGreenIcon'
	| 'islands#redIcon'
	| 'islands#violetIcon'
	| 'islands#darkOrangeIcon'
	| 'islands#blackIcon'
	| 'islands#nightIcon'
	| 'islands#yellowIcon'
	| 'islands#darkBlueIcon'
	| 'islands#greenIcon'
	| 'islands#pinkIcon'
	| 'islands#orangeIcon'
	| 'islands#grayIcon'
	| 'islands#lightBlueIcon'
	| 'islands#brownIcon'
	| 'islands#oliveIcon'

	/* С текстом внутри и хвостиком */
	| 'islands#blueStretchyIcon'
	| 'islands#darkGreenStretchyIcon'
	| 'islands#redStretchyIcon'
	| 'islands#violetStretchyIcon'
	| 'islands#darkOrangeStretchyIcon'
	| 'islands#blackStretchyIcon'
	| 'islands#nightStretchyIcon'
	| 'islands#yellowStretchyIcon'
	| 'islands#darkBlueStretchyIcon'
	| 'islands#greenStretchyIcon'
	| 'islands#pinkStretchyIcon'
	| 'islands#orangeStretchyIcon'
	| 'islands#grayStretchyIcon'
	| 'islands#lightBlueStretchyIcon'
	| 'islands#brownStretchyIcon'
	| 'islands#oliveStretchyIcon'

	/* С точкой внутри и хвостиком */
	| 'islands#blueDotIcon'
	| 'islands#darkGreenDotIcon'
	| 'islands#redDotIcon'
	| 'islands#violetDotIcon'
	| 'islands#darkOrangeDotIcon'
	| 'islands#blackDotIcon'
	| 'islands#nightDotIcon'
	| 'islands#yellowDotIcon'
	| 'islands#darkBlueDotIcon'
	| 'islands#greenDotIcon'
	| 'islands#pinkDotIcon'
	| 'islands#orangeDotIcon'
	| 'islands#grayDotIcon'
	| 'islands#lightBlueDotIcon'
	| 'islands#brownDotIcon'
	| 'islands#oliveDotIcon'
	/* Чиселка в кружочке */
	| 'islands#blueCircleIcon'
	| 'islands#darkGreenCircleIcon'
	| 'islands#redCircleIcon'
	| 'islands#violetCircleIcon'
	| 'islands#darkOrangeCircleIcon'
	| 'islands#blackCircleIcon'
	| 'islands#nightCircleIcon'
	| 'islands#yellowCircleIcon'
	| 'islands#darkBlueCircleIcon'
	| 'islands#greenCircleIcon'
	| 'islands#pinkCircleIcon'
	| 'islands#orangeCircleIcon'
	| 'islands#grayCircleIcon'
	| 'islands#lightBlueCircleIcon'
	| 'islands#brownCircleIcon'
	| 'islands#oliveCircleIcon'
	/* Точка в кружочке */
	| 'islands#blueCircleDotIcon'
	| 'islands#darkGreenCircleDotIcon'
	| 'islands#redCircleDotIcon'
	| 'islands#violetCircleDotIcon'
	| 'islands#darkOrangeCircleDotIcon'
	| 'islands#blackCircleDotIcon'
	| 'islands#nightCircleDotIcon'
	| 'islands#yellowCircleDotIcon'
	| 'islands#darkBlueCircleDotIcon'
	| 'islands#greenCircleDotIcon'
	| 'islands#pinkCircleDotIcon'
	| 'islands#orangeCircleDotIcon'
	| 'islands#grayCircleDotIcon'
	| 'islands#lightBlueCircleDotIcon'
	| 'islands#brownCircleDotIcon'
	| 'islands#oliveCircleDotIcon'
	/**
	 * Иконки в кружке и иконкой
	 * Ключ по правилу: 'islands#{цвет}{значок}Icon'.
	 */
	/* Самолётик */
	| 'islands#blueAirportIcon'
	/* Треугольник с вослицательным знаком */
	| 'islands#blueAttentionIcon'
	/* Машинка */
	| 'islands#blueAutoIcon'
	/* Мартини в бокале */
	| 'islands#blueBarIcon'
	/* Ножницы */
	| 'islands#blueBarberIcon'
	/* Пляжный зонтик */
	| 'islands#blueBeachIcon'
	/* Велосипед */
	| 'islands#blueBicycleIcon'
	/* Велосипед с человеком */
	| 'islands#blueBicycle2Icon'
	/* Книжка */
	| 'islands#blueBookIcon'
	/* Машинка в душе */
	| 'islands#blueCarWashIcon'
	/* Католический крест */
	| 'islands#blueChristianIcon'
	/* Кинокамера */
	| 'islands#blueCinemaIcon'
	/* Цирковой шатёр */
	| 'islands#blueCircusIcon'
	/* Весы */
	| 'islands#blueCourtIcon'
	/* Грузовик */
	| 'islands#blueDeliveryIcon'
	/* Проценты */
	| 'islands#blueDiscountIcon'
	/* Собака */
	| 'islands#blueDogIcon'
	/* Университетская шляпа */
	| 'islands#blueEducationIcon'
	/* Шар 8 */
	| 'islands#blueEntertainmentCenterIcon'
	/* Завод */
	| 'islands#blueFactoryIcon'
	/* Отец с ребенком */
	| 'islands#blueFamilyIcon'
	/* Футболка */
	| 'islands#blueFashionIcon'
	/* Вилка и нож */
	| 'islands#blueFoodIcon'
	/* Колонка с заправки */
	| 'islands#blueFuelStationIcon'
	/* Яблоко */
	| 'islands#blueGardenIcon'
	/* Флаг */
	| 'islands#blueGovernmentIcon'
	/* Сердечко */
	| 'islands#blueHeartIcon'
	/* Одноэтажный домик */
	| 'islands#blueHomeIcon'
	/* Кровать */
	| 'islands#blueHotelIcon'
	/* Фонтан */
	| 'islands#blueHydroIcon'
	/* i информация */
	| 'islands#blueInfoIcon'
	/* Стиральная машина */
	| 'islands#blueLaundryIcon'
	/* Домик с греческими колоннами */
	| 'islands#blueLeisureIcon'
	/* Автобус */
	| 'islands#blueMassTransitIcon'
	/* Красный крест */
	| 'islands#blueMedicalIcon'
	/* Долор */
	| 'islands#blueMoneyIcon'
	/* Гора */
	| 'islands#blueMountainIcon'
	/* Музыкальная колонка */
	| 'islands#blueNightClubIcon'
	/* Бинокль */
	| 'islands#blueObservationIcon'
	/* Лось */
	| 'islands#blueParkIcon'
	/* Р — парковка */
	| 'islands#blueParkingIcon'
	/* Крупно человек */
	| 'islands#bluePersonIcon'
	/* Портфель */
	| 'islands#bluePocketIcon'
	/* Плавающий человек */
	| 'islands#bluePoolIcon'
	/* Конверт письма */
	| 'islands#bluePostIcon'
	/* Электричка */
	| 'islands#blueRailwayIcon'
	/* Метро */
	| 'islands#blueRapidTransitIcon'
	/* Гаечный ключ */
	| 'islands#blueRepairShopIcon'
	/* Бегун */
	| 'islands#blueRunIcon'
	/* Микроскоп */
	| 'islands#blueScienceIcon'
	/* Корзина супермаркета */
	| 'islands#blueShoppingIcon'
	/* Подарочная коробка */
	| 'islands#blueSouvenirsIcon'
	/* Гантеля */
	| 'islands#blueSportIcon'
	/* Звезда */
	| 'islands#blueStarIcon'
	/* Театральные маски */
	| 'islands#blueTheaterIcon'
	/* МЖ — туалет */
	| 'islands#blueToiletIcon'
	/* Человек на лестнице спускается */
	| 'islands#blueUnderpassIcon'
	/* деревья хвойное и лиственное */
	| 'islands#blueVegetationIcon'
	/* Кинокамера современная */
	| 'islands#blueVideoIcon'
	/* Мусорная корзина */
	| 'islands#blueWasteIcon'
	/* Волны на воде */
	| 'islands#blueWaterParkIcon'
	/* Речной якорь */
	| 'islands#blueWaterwayIcon'
	/* Луковка православного храма */
	| 'islands#blueWorshipIcon'
	/* Слоник */
	| 'islands#blueZooIcon'

	/* Логотип Я в кружке */
	| 'islands#geolocationIcon'

export type YaMapOptionType = {
	/**
	 * Стиль точки на карте
	 * @link
	 * https://yandex.com/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/option.presetStorage
	 */
	preset?: YaMapPresetType
	/**
	 * hex цвет иконки
	*/
	iconColor?: `#${string}`
	/**
	 * размер иконки, лучше: 15, 15
	 */
	iconSize?: [number, number]
}
