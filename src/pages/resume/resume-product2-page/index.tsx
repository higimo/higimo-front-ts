import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'

import avatar2 from './avatar2.jpeg'

import '../resume-style.css'
import './style.css'

// https://jsonresume.org/schema

const skillSet = [
	'data-driven',
	// 'разработка нового продукта',
		// 'анализ целевой аудитории',
		// 'оценка потребностей клиентов',
		'сегментация',
		'JTBD',
	// 'умение принимать решения',
	// 'управление по целям',
		'умение ставить измеримые цели и достигать их',
		// 'SMART',
		'RICE', // 'приоритизация бэклога',
		// 'расстановка приоритетов',
		'Agile',
		// 'стратегическое планирование и менеджмент',
	'анализ данных',
		'SQL',
		// 'A/B‑тесты',
	// 'анализ бизнес показателей',
		// 'UNIT‑экономика',
		// 'AARRR‑метрики',
		// 'HEART‑метрики',
		'продуктовые метрики',
		// 'маркетинговые метрики',
	'UX',
		'Figma',
		'FigJam',
		'Miro',
		'Jira/Confluence',
	// 'лидерство',
		// 'умение общаться с разработчиками на одном языке',
		// 'эмпатия',
		// 'мотивация персонала',
	// 'проведение презентаций',
	// 'целеустремленность',
]

export const ResumeProduct2Page: FunctionComponent = () => {
	usePageTitle('В активном поиске')

	return (
		<div className="resume-product2-page resume-page">
			<TextContainer>
				<img src={avatar2} className="resume-avatar" />
				<h2>Резюме на позицию Product manager</h2>
				<p className="small-text">Дмитрий Уткин</p>
				<div className="contact">
					<div className="contact__item small-text"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item small-text">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item small-text"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item small-text"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
			</TextContainer>
			<TextContainer>
				<p className="small-text">
					Опытный Product Manager (4,5 года) с экспертизой в ML, UNIT-экономике, JTBD, Traction-моделировании и кратном росте. Создал стратегию кратного роста, увеличил выручку на 11% в HRtech. Глубоко понимаю разработку (10 лет опыта разработчиком). Наймом увеличил команду в 2 раза с нулевым attrition.
				</p>
				<p className="small-text">
					Ищу внутрекорпоративные, платформенные, ML и B2C/B2B продукты для запуска и масштабирования.
				</p>
			</TextContainer>
			<TextContainer>
				<div className="expirience">
					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Руководитель менеджеров продукта</div>
								<div className="company__name"><a href="https://superjob.ru">SuperJob</a></div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2022 — февраль 2025</div>
								<div className="company__time">(3 года)</div>
							</div>
						</div>
						<div className="company__description">
							{/* Мау конверсии, кол. откликов, полнота и точность поиска, сообщений в чатах */}
							<p>
								HRtech-сервис поиска работы, как Хедхантер
							</p>
							<p>
								Главное достижение: ускорил списание балансных средств на 18% (год к году). Это увеличило LTV +19%, и выручку +11%, через учащение отклика кандидатов. Для этого внедрил ML на linear regression по поведению пользователей, для релевантной поисковой выдачи вакансий, отдельно увеличил конверсию в отклик +10% и релевантность отклика +20%; в интерфейсе HR-ов утроил выдачу резюме в поиске работы.
							</p>
							{/* Удвоил скорость загрузки страниц */}
							<p>
								Процессы: построил процесс Discovery на основе JTBD, сегментации, CustDev и Traction-моделировании для поиска точек кратного роста; и наладил Delivery: БФТ, API, ERD, UML. Работаю по Scrum, следя за T2M и проводя A/B-тесты. Утвердил стратегию развития у управления. Покрыл документацией (760 doc) 100% функций 25-летнего легаси, для оптимизации проектирования. Создал дизайн-систему, ускорив T2M, 6→3 недель. Проверил 300 гипотез, где ROI {'>'} 100%.
							</p>
							{/* Оценка гипотез через юнит-экономику */}
							{/* Презентация планов */}
							<p>
								Управление и руководство: в подчинении 3 продакта и кросс-функциональная команда из 30 человек. Увеличил команду вдвое (+15) с нулевым attrition, растил и нанимал сотрудников.
							</p>
								{/* <strong>Помог бизнесу вырастить метрики</strong>: +10% engagment раздела откликов; +200% активных резюме в поиске; <span className="nowrap">+20% качества поиска</span>; +35% качество новых резюме; +10% откликов; <span className="nowrap">+20% релевантности</span> отклика; +50–200% скорости загрузки страниц; +200% MAU отзывов. Ключевые: <span className="nowrap">кол. откликов</span>, конверсия в отклики */}
						</div>
					</div>

					<div class="staff__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Менеджер продукта</div>
								<div class="company__name"><a href="https://artlebedev.ru">Студия Лебедева</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">июнь 2019 — ноябрь 2020</div>
								<div class="company__time">(1,5 года)</div>
							</div>
						</div>
						<div class="company__description">
							<p>
								Библиотекус — корпоративная библиотека. Создал Экслибрис. Создал сценарий взятия книги с помощью пропуска и RFID-меток (полностью сам, до реализации на устройстве). Вел рассылку о библиотеке на компанию. Фонд вырос в 2,5 раза до 2500 книг. Утеря книг сократилась до 0.
							</p>
						</div>
					</div>

					<div class="staff__element company">
						<h2>Разработчик фронтенд на React, бекенд на Битриксе</h2>
						<p className="small-text">
							@<a href="https://daily.afisha.ru">Афиша Дейли</a>, @<a href="https://artlebedev.ru">Студия Артемия Лебедева</a>, @<a href="https://ispring.ru">iSpring</a> // 2012—2022 (10 лет)
						</p>
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession"></div>
								<div class="company__name--alt">
									
									</div>
							<div class="company__timing">
								<div class="company__period"></div>
								<div class="company__time"></div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</TextContainer>

			<TextContainer>
				<div class="skill">
					<div class="skill_header">
						Навыки
					</div>
					<div class="skill_content">
						{skillSet.join(', ')}
					</div>
				</div>
				{/* <div class="about">
					<div class="about__header">Обо мне</div>
					<div class="about__description"> */}
						
						{/* <p>
							Разговариваю на одном языке с разработчиками, дизайнерами и бизнесом, благодаря 8 годам fullstack-разработки и работе в Студии Лебедева.
						</p> */}
					{/* </div>
				</div> */}
			</TextContainer>

			<TextContainer>
				<div class="school small-text">
					<div class="school__info">
						<div class="school__status">Неоконченное высшее образование</div>
						<div class="school__date">2011–2015 (4 курса)</div>
					</div>
					<div className="school__base">
						<div class="school__name">Программная инженерия</div>
						<div class="school__company">Поволжский Государственный Технологический Университет</div>
					</div>
				</div>
			</TextContainer>

			{/* <OtherResume /> */}
			{/* <ContactList /> */}
		</div>
	)
}

export default ResumeProduct2Page