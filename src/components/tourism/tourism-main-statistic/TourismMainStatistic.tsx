import { PovType } from 'api-types/tourism.types'
import { Fragment, FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'
import { TourismStatisticMoscow } from 'components/tourism/tourism-statistic-moscow'
import { TourismStatisticMustPov } from 'components/tourism/tourism-statistic-must-pov'
import { TourismStatisticRussia } from 'components/tourism/tourism-statistic-russia'
import { TourismStatisticWorld } from 'components/tourism/tourism-statistic-world'
import { TourismHeader } from '../tourism-header'

type TourismMainStatisticPropsType = {
	totalStatistic: PovType[]
}
export const TourismMainStatistic: FunctionComponent<TourismMainStatisticPropsType> = ({ totalStatistic }) => (
	<Fragment>
		<TextContainer>
			<TourismSecondary main>
				Я путешествую по спискам, где бы хотел побывать. Там города и отдельные места, например, Байкал и озеро Рица, парк Кудыкина гора. В России я бы хотел побывать во всех регионах и значимых городах. Ещё я хочу побывать во всех русских крепостях: кремли и замки вроде Изборска — они прекрасны.
			</TourismSecondary>
			<TourismSecondary main>
				Под статистикой можно ознакомиться, где я ещё не был и вписаться со мной в путешествие)
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<TourismHeader secondary>Статистика по миру</TourismHeader>
			<TourismSecondary>
				Сколько мест посетил из намеченного списка. И как называется список.
			</TourismSecondary>
		</TextContainer>
		<TourismStatisticWorld total={totalStatistic} />
		<br /><br />

		<TextContainer>
			<TourismHeader secondary>По России</TourismHeader>
		</TextContainer>
		<TourismStatisticRussia total={totalStatistic} />
		<br /><br />

		<TextContainer>
			<TourismHeader secondary>Впечатляющие места</TourismHeader>
			<TourismSecondary>
				Здесь нет городов, где живут люди. Только точки интереса на карте, куда мне интересно попасть
			</TourismSecondary>
		</TextContainer>
		<TourismStatisticMustPov total={totalStatistic} />
		<br /><br />

		<TextContainer>
			<TourismHeader secondary>По Москве</TourismHeader>
			<TourismSecondary>
				Я очень люблю Москву. Она — Русское поле экспериментов. Например, в Курьяново построили двухэтажные домики, которые стали прообразом для застройки моей родной Шахуньи. Поэтому, мне важно побывать во всех округах и районах Москвы, на всех станциях метро. А ещё я хочу обойти кажду улицу внутри МКАД.
			</TourismSecondary>
		</TextContainer>
		<TourismStatisticMoscow total={totalStatistic} />
		<br /><br />

		<TextContainer>
			<TourismHeader secondary>Список для путешествий</TourismHeader>
			<TourismSecondary>
				Можно отобразить таблицей, карточками и посмотреть на карте. С белой подложкой то, где я уже был. Где не был — можно вписаться в путешествие)
			</TourismSecondary>
		</TextContainer>
	</Fragment>
)
