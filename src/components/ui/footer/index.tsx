import { FunctionComponent } from 'preact'

import { useGlobalContext } from '../../../context/global';

import { TextContainer } from '../text-container';
import { OnlyAdmin } from '../../util/only-admin';

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS';
import { EXTERNAL_LINKS } from '../../../dic/EXTERNAL_LINKS';

import './style.css'

export const Footer: FunctionComponent = (props) => {
	const { isNotFound } = useGlobalContext()
	if (isNotFound) {
		return null
	}

	return (
		<footer>
			<TextContainer className="footer">
				<div className="footer__column">
					<div className="footer__header"><a href={ROUTE_LINKS.projectIndex}>Сделал</a></div>
					<div className="footer__header">Делюсь знаниями</div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.intersection}>Пересечения</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.canalRak}>Раковарня 2.0</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.canalEfficient}>Техники → навыки → счастье</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.canalScreen}>Скриншотил</a></div>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.TODO}>Интенсив</a></div></OnlyAdmin>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.learningIndex}>Обучение</a></div></OnlyAdmin>
					<div className="footer__link"><a href={ROUTE_LINKS.feedbackIndex}>Багрепорты</a></div>
					<div className="footer__header">Связаться</div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.socialVk}>ВКонтакте</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.contactMail}>Электропочта</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.socialIg}>Инста</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.socialTg}>Телеграм</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.github}>Гитхаб</a></div>
				</div>
				<div className="footer__column">
					<div className="footer__header">Сделал сервисов</div>
					<div className="footer__link"><a href={ROUTE_LINKS.tourismIndex}>Путешествую</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.serviceTimer}>🕑 Калькулятор времени</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.listListIndex}>Список списков</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.clock}>Часы русского судного дня</a></div>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.demagog}>Справочник демагога</a></div></OnlyAdmin>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.nokiaIndex}>Нокиа</a></div></OnlyAdmin>
					<div className="footer__link"><a href={ROUTE_LINKS.toolComoji}>Комоджи</a> (⌐■_■)</div>
					<div className="footer__link"><a href={ROUTE_LINKS.toolVkIndex}>🖼 Фотографии во ВКонтакте</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.toolEmailer}>✉ Эмайлер</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.toolMagic}>Волшебный шар</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.petProject}>Пробби</a></div>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.pron}>Прон</a></div></OnlyAdmin>
					<div className="footer__link"><a href={EXTERNAL_LINKS.serviceDeploy}>Календарь деплоя</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.botRole}>Бот упоминаний</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.botDoll}>🪆 Бот трёх заданий</a></div>
				</div>
				<div className="footer__column">
					<div className="footer__header">Храню знания</div>
					<OnlyAdmin><div className="footer__link"><a href={ROUTE_LINKS.thingsIndex}>Мои вещи</a></div></OnlyAdmin>
					<div className="footer__link"><a href={ROUTE_LINKS.faqIndex}>FAQ</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.gameIndex}>Настольные игры</a></div>
					<div className="footer__link"><a href={EXTERNAL_LINKS.wishlist}>Список желаний</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.accordIndex}>Аккорды</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.cinemaIndex}>Кинолог</a></div>
					<div className="footer__link">Избранные <a href={ROUTE_LINKS.youtube}>видосы</a> и <a href={ROUTE_LINKS.links}>ссылки</a></div>
					<div className="footer__link"><a href={ROUTE_LINKS.logism}>☝ Логизмы</a></div>
					<div className="footer__link footer__link--copyright">Сделал Хиги́мо</div>
				</div>
			</TextContainer>
		</footer>
	)
}
