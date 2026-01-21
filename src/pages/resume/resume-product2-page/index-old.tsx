import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import avatar2 from './avatar2.jpeg'

import '../resume-style.css'
import './style.css'

// https://jsonresume.org/schema

const skillSet = [
	'data-driven',
	'разработка нового продукта',
		'анализ целевой аудитории',
		'оценка потребностей клиентов',
	// 'умение принимать решения',
	// 'управление по целям',
		'умение ставить измеримые цели и достигать их',
		'SMART',
		'RICE', // 'приоритизация бэклога',
		// 'расстановка приоритетов',
		'Agile',
		'стратегическое планирование и менеджмент',
	'анализ данных',
		'SQL',
		'A/B‑тесты',
	// 'анализ бизнес показателей',
		'UNIT‑экономика',
		'AARRR‑метрики',
		'HEART‑метрики',
		'продуктовые метрики',
		// 'маркетинговые метрики',
	'UX',
		'Figma',
	'лидерство',
		// 'умение общаться с разработчиками на одном языке',
		// 'эмпатия',
		'мотивация персонала',
	'проведение презентаций',
	'целеустремленность',
]

export const ResumeProduct2Page: FunctionComponent = () => {
	usePageTitle('В активном поиске')

	return (
		<div className="resume-product2-page resume-page">
			<TextContainer>
				<img src={avatar2} className="resume-avatar" />
				<h2>Резюме на позицию Product owner/manager</h2>
				<p>Дмитрий Уткин, менеджер продукта</p>
				{/* <p className="mini-text">мужчина, 31 год (26 июля 1993)</p>
				<p className="mini-text">Гражданство РФ, на полный день</p> */}
			</TextContainer>
			<TextContainer>
				<div className="contact">
					<div className="contact__item"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
			</TextContainer>
			<TextContainer>
				5 
				сразу после контактов добавляй саммари (опыт, домены, сегменты рынка, сильные стороны, что ищешь)
			</TextContainer>
			{/* <TextContainer>
				<div className="experience-summary">
					<div className="experience-summary__item">Стаж в IT — 10 лет 9 мес.</div>
					<div className="experience-summary__item">Менеджером 5 лет 3 мес.</div>
					<div className="experience-summary__item">Разработчиком: 6 лет 6 мес. (+1 год 8 мес. лидом)</div>
				</div>
			</TextContainer> */}
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
								Продукт сервис поиска работы (как HH). Ускорил списание балансных средств на 18% (год к году)
							</p>
							<p>
								<strong>Помог бизнесу вырастить метрики</strong>: +10% engagment раздела откликов; +200% активных резюме в поиске; <span className="nowrap">+20% качества поиска</span>; +35% качество новых резюме; +10% откликов; <span className="nowrap">+20% релевантности</span> отклика; +50–200% скорости загрузки страниц; +200% MAU отзывов. Ключевые: <span className="nowrap">кол. откликов</span>, конверсия в отклики
							</p>
							<p>
								Руководил 3 продактами и кросс-функциональной командой: разработчики, дизайнеры, тестировщики, аналитики, маркетологи и продажи. Утвердил стратегию развития, банк гипотез и проблематик продукта. Реализовал 300 проектов. Собрал документацию из 760 доков. Организовал рабочие группы Discovery и Дизайн-системы.
							</p>
							<p>
								В ответственность входил Discovery: JTBD, UserStory, CJM, сегменты пользователей, Cust Dev, UI-test, воронка конверсии и поиск точек кратного роста. И Delivery: техдокументация из ERD, API, sequence и прочих UML. А также Scrum-ритуалы, T2M и A/B-тесты.
							</p>
						</div>
					</div>

					{/* Параллельная работа */}
					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Аудитор ИТ-службы</div>
								<div class="company__name"><a href="https://eurogym.ru">Европейская гимназия</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">окт. 2024 — декабрь 2024</div>
								<div class="company__time">(3 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							<p>
								Автоматизировал отчёты о нагрузке сотрудников и для Управляющей команды. Уладил конфликты и настроил процессы на основе ритуалов Agile, проверил, что прижилось.
							</p>
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
								<div class="company__time">(1 год 6 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							<p>
								Продукт Библиотекус, корпоративная библиотека. Создал Экслибрис. Создал сценарий взятия книги с помощью пропуска и RFID-меток (полностью сам, до реализации на устройстве). Вел рассылку о библиотеке на компанию. Фонд вырос с 1000 до 2500 наименований.
							</p>
						</div>
					</div>

					{/* Параллельная работа */}
					<div class="staff__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Проектный менеджер</div>
								<div class="company__name"><a href="https://web-standards.ru">Веб-стандарты</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">сентябрь 2019 — февраль 2020</div>
								<div class="company__time">(6 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							<p>
								Сайт подкаста и статей экспертов, для развития сообщества фронтендеров СНГ. Организовал опенсорсное сообщество для разработки, сменеджерил 260 тасок, для фокусировки и прозрачности. Выступал с докладом в офисе Хабра.
							</p>
						</div>
					</div>

					<div class="staff__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Разработчик фронтенд на React, бекенд на Битриксе</div>
								<div class="company__name"><a href="https://daily.afisha.ru">@Афиша Дейли</a>, <a href="https://artlebedev.ru">Студия Артемия Лебедева</a>, <a href="https://ispring.ru">iSpring</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">2012—2022</div>
								<div class="company__time">(10 лет)</div>
							</div>
						</div>
					</div>

					{/* <div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">frontend-разработчик</div>
								<div class="company__name"><a href="https://daily.afisha.ru">Афиша Дейли</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">дек. 2020..фев. 2022</div>
								<div class="company__time">(1 год 3 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							TypeScript: гаджет-сервис продажи на сайте; перезапуск Афиши Дейли
						</div>
					</div>

					<div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">fullstack-разработчик</div>
								<div class="company__name"><a href="https://artlebedev.ru">Студия Артемия Лебедева</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">фев. 2017..ноябрь 2020</div>
								<div class="company__time">(3 года 10 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							Битрикс и Имприматур: порядка 40 проектов внутренних и публичных.
						</div>
					</div>

					<div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Lead fullstack-разработки</div>
								<div class="company__name"><a href="https://r-top.ru">R-top</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">июнь 2015..январь 2017</div>
								<div class="company__time">(1 год 8 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							Лидировал разработку. Fullstack на Битрикс: порядка 50 проектов. Внутренние инструменты, создание рассылок. <a href="https://www.youtube.com/watch?v=Uul75kheIMw&amp;list=PLKbZQbD1FjCEU52e56v_H-ThYrZ7NUMJN&amp;index=13">Выступал на Digital Оттепели 2016</a>
						</div>
					</div>

					<div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">fullstack-разработчик</div>
								<div class="company__name">Студия JET</div>
							</div>
							<div class="company__timing">
								<div class="company__period">февраль..июль 2015</div>
								<div class="company__time">(6 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							Верстка, PHP — Drupal и Лендинги
						</div>
					</div>

					<div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">frontend-разработчик</div>
								<div class="company__name"><a href="https://citronium.ru/">Citronium</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">июнь..август 2012</div>
								<div class="company__time">(3 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							Рефакторинг MVP в продукт Planstery (теперь StroyControl): canvas + svg для отображения чертежей
						</div>
					</div>

					<div class="staff__element company--table">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">fullstack-разработчик</div>
								<div class="company__name"><a href="https://ispring.ru">CPS Labs (теперь iSpring)</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">январь..август 2012</div>
								<div class="company__time">(8 мес.)</div>
							</div>
						</div>
						<div class="company__description">
							php, js, NodeJS
						</div>
					</div> */}

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
				<div class="about">
					<div class="about__header">Обо мне</div>
					<div class="about__description">
						<p>
							Привет! Я опытный менеджер продукта, 11 лет опыта в IT, из них 5 лет менеджмента. Мне интересны трудные профессиональные вызовы, обширный опыт позволяет всегда предложить оптимальные бизнес-решения.
						</p>
						<p>
							Разговариваю на одном языке с разработчиками, дизайнерами и бизнесом, благодаря 8 годам fullstack-разработки и работе в Студии Лебедева.
						</p>
					</div>
				</div>
			</TextContainer>

			<TextContainer>
				<div class="school">
					<div class="school__info">
						<div class="school__status">Неоконченное высшее образование</div>
						<div class="school__date">2011–2015</div>
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