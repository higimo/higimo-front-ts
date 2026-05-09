import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import { getHumanDate } from 'components/project/utils/getHumanDate'

import 'components/project/project-viewer/style.css'
import './style.css'

export const PortfolioSandbox: FunctionComponent = () => {
	usePageTitle('Тестовая страница')

	return (
		<div className="project-viewer">
			<TextContainer className="project-viewer__date">
				{getHumanDate('2026-02-13')}
			</TextContainer>
			<TextContainer>
				<h1>Тестовая страница</h1>
			</TextContainer>
			<div className="content">
<div class="task">
	<div class="task__text">
		Разработать систему самостоятельной записи родителей на трёхсторонние встречи через Телеграм, исключив ручную координацию администрации
	</div>
</div>


<div class="announce__text">
	<h2>Проблематика</h2>
	<p>
		Администратор тратил неделю на организацию трёхсторонних встреч родитель—ребёнок—учитель каждую четверть. Сбор слотов, ожидания родителей — процесс кропотливый и длительный.
	</p>
	<h2>Гипотеза</h2>
	<p>
		Если автоматизировать работу через простой интерфейс, то издержки администрации сократятся на 80%, актуальность информации будет в реальном времени, а количество ошибок сойдёт до нуля.
	</p>
</div>


<div class="announce__text">
	<h2>Решение</h2>
	<p>
		Телеграм популярен в России. Когда встал вопрос автоматизации, то его выбрали за привычность и отсутствие необходидимости дополнительных приложений.
	</p>
</div>


<div class="announce__text">
	<h2>Три бота</h2>
	<p>
		Система из трёх ботов:
	</p>
	<ul>
		<li>Родительский, чтобы записаться и получить ссылку на звонок</li>
		<li>Учительский, чтобы сообщать слоты и управлять встречами</li>
		<li>Администраторский, для админ-действий</li>
	</ul>
	<p>
		Отдельные интерфейсы исключают ошибки входа в чужой сценарий. Предельно упрощая интерфейс бота.
	</p>
	<p>
		В каждом боте главное меню показывается клавиатурой чата.
	</p>
</div>

<div class="container-row">
	<div class="container-panel--50">
		<div className="tg-chat">
			<div className="tg-chat__keyboard">
				<div className="keyboard-row">
					<div className="keyboard-btn">Отменить встречи</div>
					<div className="keyboard-btn">Личный код</div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-btn">Посмотреть ближайшие</div>
					<div className="keyboard-btn">Сообщить свои слоты</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-panel--50">
		<div className="tg-chat">
			<div className="tg-chat__keyboard">
				<div className="keyboard-row">
					<div className="keyboard-btn">Таблица расписания преподавателей</div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-btn">Обновить расписание в боте</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-panel--50">
		<div className="tg-chat">
			<div className="tg-chat__keyboard">
				<div className="keyboard-row">
					<div className="keyboard-btn">Назначить встречу</div>
					<div className="keyboard-btn">Отменить встречу</div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-btn">Посмотреть мои встречи</div>
				</div>
			</div>
		</div>
	</div>
</div>






<div class="announce__text">
	<p>
		Контекстные действия через клавиатуру сообщения
	</p>
</div>
<div className="tg-chat">
	<div className="tg-chat__messages">
		<div className="tg-message tg-message--left">
			Выберите, что отменить:<br />
			1. 26 февраля 08:30 higimo<br />
			2. 26 февраля 09:00 higimo
		</div>
		<div className="tg-chat__keyboard tg-chat__keyboard--inline">
			<div className="keyboard-row">
				<div className="keyboard-btn">1</div>
				<div className="keyboard-btn">2</div>
			</div>
		</div>
	</div>
	<div className="tg-chat__messages">
		<div className="tg-message tg-message--left">
			Выберите дисциплину
		</div>
		<div className="tg-chat__keyboard tg-chat__keyboard--inline">
			<div className="keyboard-row">
				<div className="keyboard-btn">Sport</div>
				<div className="keyboard-btn">English</div>
			</div>
		</div>
	</div>
	<div className="tg-chat__messages">
		<div className="tg-message tg-message--left">
			Выберите удобную дату
		</div>
		<div className="tg-chat__keyboard tg-chat__keyboard--inline">
			<div className="keyboard-row">
				<div className="keyboard-btn">05.10.2022</div>
				<div className="keyboard-btn">06.10.2022</div>
			</div>
		</div>
	</div>
</div>





<div class="announce__text">
	<h2>Учительский</h2>
	<p>
		Для регистрации достаточно запросить личный код у бота и переслать его администратору. Такая валидация гарантирует компроментированность злоумышленниками.
	</p>
	<p>
		Ключевой сценарий бота — задание слотов. Многошаговые сценарии традиционно называются Мастером (визардом). Учитель сообщает о желании, в ответ получая инструкцию и своё текущее состояние, что удобно для редактирования. Присылает новые слоты по образцу, смотрит на корректность распознания ввода и сохраняет.
	</p>
	<p>
		Указание слотов подобрано для минимального повторения:
	</p>
	<pre>
		12.02.2023<br />
		15:30<br />
		15:45<br />
		17:30<br /><br />
		13.02.2023<br />
		17:00<br />
		17:30<br />
	</pre>
	<p>
		Конечно, можно посмотреть текущие встречи и отменить какую-то из них, по необходимости.
	</p>
</div>
<div class="announce__text">
	<h2>Родители</h2>
	<p>
		В телеграмме можно использовать любые аватарки, номера телефонов и ники. В то же время учителям важно понимать с кем назначена встреча, чей это родитель. Для этого реализован мастер ввода имени по образцу.
	</p>
	<p>
		Ключевой сценарий родителя — назначение встречи. Покуда детей может быть несколько, родителям предлагают выбрать класс класс→предмет→учителя→дату→время.
	</p>
	<p>
		Родитель тоже может смотреть и отменять назначенные встречи.
	</p>
</div>

<div class="announce__text">
	<h2>Администрирование</h2>
	<p>
		Для администрирования реализована админка в самом привычном и дешевом инструменте на свете — Экселе.
	</p>
	<p>
		Раз в год учительский состав актуализируется. У каждого преподавателя есть постоянная ссылка на комнату для звонка. Когда учитель пришлёт личный код, его достаточно указать на специальном листе.
	</p>
	<p>
		Когда учителю понадобится помощь с назначением слотов, и так же можно указать через админку.
	</p>
	<p>
		Фатальный недостаток экселя — расхождения в ячейках. Для предупреждения сделаны специальные кросс-чек ячейки, для сверки всей информации, с подсветкой потенциальных ошибок.
	</p>
</div>

<div class="announce__text">
	<h2>Уведомления</h2>
	<p>
		Чтобы встреча состоялась и на неё не опоздали, утром и за 10 минут до начала родителю и учителю присылается уведомление о встрече со ссылкой на комнату-звонок.
	</p>
</div>

<div class="announce__text">
	<h2>Хранение сообщений</h2>
	<p>
		У телеграмма есть две технические особенности:
	</p>
	<ul>
		<li>в любую кнопку нельзя передавать данных больше 64 байт;</li>
		<li>каждое сообщение — отдельный запрос, никак не связанный с предыдущим, получить историю нельзя</li>
	</ul>
	<p>
		Значит, передавать состояние через сам телеграмм нельзя, его нужно хранить в памяти бота для всех мастеров.
	</p>
	<p>
		Состояние хранится в виде выбранных данных пользователя. Такая валидация предупреждает ошибки и позволяет не хранить лишнюю информацию.
	</p>
</div>


<div class="announce__text">
	<h2>Архитектура</h2>
	<p>
		Использован шаблон проектирования Цепочка, где каждый обработчик отвечает только за одну команду, что позволяет легко расширять сценарии, без опасности влияния на предыдущие.
	</p>
	<p>
		И объект команды — унифицированный интерфейс, где указана использованная команда, нажатая кнопка с аргументами или текстовое сообщение.
	</p>
</div>


<div class="announce__text">
	<h2>Tone-of-voice</h2>
	<p>
		Гимназия определённым заботливым образом разговаривает со своими родителями. Поэтому, все изначально черновые фразы прошли через редактуру и соответствуют стилю.
	</p>
</div>


<div class="unit-of-sense">
	<div class="unit-of-sense__main">
		В привычном контексте Телеграмма, пользователи быстрее привыкают к новым UGC-сценариям
	</div>
</div>

<div class="result-metric">
	<div class="result-metric__metric">
		120 → 2
	</div>
	<div class="result-metric__description">
		часа/год временных затрат (-98%)
	</div>
</div>
<div class="factoid-gallery">
	<div class="factoid-gallery__item factoid-gallery__item--long">
		<div class="factoid-gallery__counter">1797</div>
		<div class="factoid-gallery__description">всего встреч</div>
	</div>
	<div class="factoid-gallery__item factoid-gallery__item--long">
		<div class="factoid-gallery__counter">1127</div>
		<div class="factoid-gallery__description">назначено встреч</div>
	</div>
	<div class="factoid-gallery__item">
		<div class="factoid-gallery__counter">670</div>
		<div class="factoid-gallery__description">отменённых встреч</div>
	</div>
</div>

<div class="factoid-gallery factoid-gallery--leaf">
	<div class="factoid-gallery__item factoid-gallery__item--long factoid-gallery__item--leaf">
		<div class="factoid-gallery__counter">93</div>
		<div class="factoid-gallery__description">учителя пользуются ботом используют в год</div>
	</div>
	<div class="factoid-gallery__item factoid-gallery__item--leaf">
		<div class="factoid-gallery__counter">365</div>
		<div class="factoid-gallery__description">семей использовали бота</div>
	</div>
</div>



			</div>
		</div>
	)
}

export default PortfolioSandbox
