import { PovType } from 'components/tourism/data/russia-city2'
import { Fragment, FunctionComponent } from 'preact'

import { TourismStatisticMoscow } from 'components/tourism/tourism-statistic-moscow'
import { TourismStatisticMustPov } from 'components/tourism/tourism-statistic-must-pov'
import { TourismStatisticRussia } from 'components/tourism/tourism-statistic-russia'
import { TourismStatisticWorld } from 'components/tourism/tourism-statistic-world'
import { TextContainer } from 'components/ui/text-container'

type TourismMainStatisticPropsType = {
	totalStatistic: PovType[]
}
export const TourismMainStatistic: FunctionComponent<TourismMainStatisticPropsType> = ({ totalStatistic }) => (
	<Fragment>
		<TextContainer>
			<p>
				Я путешествую по спискам, где бы хотел побывать. Там города и отдельные места, например, Байкал и озеро Рица, парк Кудыкина гора. В России я бы хотел побывать во всех регионах и значимых городах. Ещё я хочу побывать во всех русских крепостях: кремли и замки вроде Изборска — они прекрасны.
			</p>
			<p>
				Под статистикой можно ознакомиться, где я ещё не был и вписаться со мной в путешествие)
			</p>
		</TextContainer>
		<TourismStatisticWorld total={totalStatistic} />
		<br /><br />
		<TourismStatisticRussia total={totalStatistic} />
		<br /><br />
		<TourismStatisticMustPov total={totalStatistic} />
		<br /><br />
		<TourismStatisticMoscow total={totalStatistic} />
		<br /><br />
		<TextContainer>
			<h2>Список для путешествий</h2>
			<p>
				Можно отобразить таблицей, карточками и посмотреть на карте. С белой подложкой то, где я уже был. Где не был — можно вписаться в путешествие)
			</p>
		</TextContainer>
	</Fragment>
)
