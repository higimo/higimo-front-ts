import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../components/ui/text-container'

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
		'RICE', // 'приоритизация бэклога',
		// 'расстановка приоритетов',
		'Agile',
		'SMART',
		'стратегическое планирование и менеджмент',
	'анализ данных',
		'SQL',
		'A/B‑тесты',
	// 'анализ бизнес показателей',
		'UNIT‑экономика',
		'HEART‑метрики',
		'AARRR‑метрики',
		'продуктовые метрики',
		// 'маркетинговые метрики',
	'UX',
		'Figma',
	'лидерские качества',
		'умение общаться с разработчиками на одном языке',
		// 'эмпатия',
		'мотивация персонала',
	'навыки презентации',
	'целеустремленность',
]

export const ResumeProduct2Page: FunctionComponent = () => {
	document.title = 'В активном поиске'

	return (
		<div className="resume-product2-page resume-page">
			<TextContainer>
				<img src={avatar2} className="resume-avatar" />
				<p>Дмитрий Уткин, менеджер продукта</p>
				<p className="mini-text">мужчина, 31 год (26 июля 1993)</p>
				<p className="mini-text">Гражданство РФ, на полный день</p>
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
				<div className="experience-summary">
					<div className="experience-summary__item">Стаж в IT — 10 лет 9 мес. (<em>часть опыта параллельно в разных организациях</em>)</div>
					<div className="experience-summary__item">Менеджером 5 лет 3 мес.</div>
					<div className="experience-summary__item">Разработчиком: 6 лет 6 мес. (+1 год 8 мес. лидом)</div>
				</div>
			</TextContainer>
			<TextContainer>
				<div className="expirience">
					<div className="expirience__element company">
						<div className="company__profession">Руководитель менеджеров продукта</div>
						<div className="company__meta">
							<div className="company__period">март 2022 — февраль 2025</div>
							<div className="company__time">3 года</div>
							<div className="company__name"><a href="https://superjob.ru">SuperJob</a></div>
						</div>
						<div className="company__description">
						<p>
								Ускорил списание балансных средств на 18% (год к году)
							</p>
							<p>
								<strong>Помог бизнесу вырастить метрики</strong>: +10% вовлечения в новом разделе откликов; +300% активных пользователей; +35% качества новых резюме; +10% откликов; +20% качества поиска; +50–200% скорости загрузки страниц; +200% посещаемости отзывов; +20% релевантности отклика.
							</p>
							<p>
								Руководил 3 продактами и управлял командой из 15 инженеров. Утвердил стратегию развития, банк гипотез и проблематик продукта.
							</p>
							<p>
								Реализовал 300 проектов с A/B-тестами и без, кастдевами, коридорками. Собрал документацию из 760 документов. Централизовал аналитику метрик, их методологию и дерево метрик. Организовал рабочие группы исследований и Дизайн-системы.
								{/* Практиковал JTBD, CJM, data-driven. */}
							</p>
						</div>
					</div>

					<div class="expirience__element company">
						<div class="company__profession">Аудитор ИТ-службы</div>
						<div class="company__meta">
							<div class="company__period">окт. 2024 — декабрь 2024</div>
							<div class="company__time">3 мес.</div>
							<div class="company__name"><a href="https://eurogym.ru">Европейская гимназия</a></div>
						</div>
						<div class="company__description">
							<p>
								Автоматизировал отчёты о нагрузке сотрудников и для Управляющей команды. Уладил конфликты и настроил процессы на основе ритуалов Agile
							</p>
						</div>
					</div>


					<div class="staff__element company">
						<div class="company__profession">Менеджер продукта</div>
						<div class="company__meta">
							<div class="company__period">июнь 2019 — ноябрь 2020</div>
							<div class="company__time">1 год 6 мес.</div>
							<div class="company__name"><a href="https://artlebedev.ru">Студия Лебедева</a></div>
						</div>
						<div class="company__description">
							<p>
								Продукт Библиотекус. Создал Экслибрис. Создал сценарий взятия книги с помощью пропуска и RFID-меток (полностью сам). Вел рассылку о библиотеке на компанию. Фонд вырос с 1000 до 2500 наименований.
							</p>
						</div>
					</div>


					<div class="staff__element company">
						<div class="company__profession">Проектный менеджер</div>
						<div class="company__meta">
							<div class="company__period">сентябрь 2019 — февраль 2020</div>
							<div class="company__time">6 мес.</div>
							<div class="company__name"><a href="https://web-standards.ru">Веб-стандарты</a></div>
						</div>
						<div class="company__description">
							<p>
								Организовал опенсорсное сообщество для разработки, сменеджерил 260 тасок, для фокусировки и прозрачности. Шерил опыт в офисе Хабра.
							</p>
						</div>
					</div>

					<div class="staff__element company">
						<div class="company__profession">Лид разработки</div>
						<div class="company__meta">
							<div class="company__period">июнь 2015 — январь 2017</div>
							<div class="company__time">1 год 8 мес.</div>
							<div class="company__name"><a href="https://r-top.ru">R-top</a></div>
						</div>
						<div class="company__description">
							<p>
								Лидировал разработку. Fullstack на Битрикс: порядка 50 проектов. Внутренние инструменты, создание рассылок. <a href="https://www.youtube.com/watch?v=Uul75kheIMw&amp;list=PLKbZQbD1FjCEU52e56v_H-ThYrZ7NUMJN&amp;index=13">Выступал на Digital Оттепели 2016</a>
							</p>
						</div>
					</div>

					<div class="staff__element company--alt">
						<div class="company__profession">Фронтенд-разработчик</div>
						<div class="company__meta">
							<div class="company__period">дек. 2020 — фев. 2022</div>
							<div class="company__time">1 год 3 мес.</div>
							<div class="company__name"><a href="https://daily.afisha.ru">Афиша Дейли</a></div>
						</div>
						<div class="company__description">
							TypeScript: гаджет-сервис продажи на сайте; перезапуск Афиши Дейли
						</div>
					</div>

					<div class="staff__element company--alt">
						<div class="company__profession">fullstack-разработчик</div>
						<div class="company__meta">
							<div class="company__period">фев. 2017..ноябрь 2020</div>
							<div class="company__time">3 года 10 мес.</div>
							<div class="company__name"><a href="https://artlebedev.ru">Студия Артемия Лебедева</a></div>
						</div>
						<div class="company__description">
							Битрикс и Имприматур: порядка 40 проектов внутренних и публичных.
						</div>
					</div>

					<div class="staff__element company--alt">
						<div class="company__profession">fullstack-разработчик</div>
						<div class="company__meta">
							<div class="company__period">февраль..июль 2015</div>
							<div class="company__time">6 мес.</div>
							<div class="company__name">Студия JET</div>
						</div>
						<div class="company__description">
							Верстка, PHP — Drupal и Лендинги
						</div>
					</div>

					<div class="staff__element company--alt">
						<div class="company__profession">Фронтенд-разработчик</div>
						<div class="company__meta">
							<div class="company__period">июнь..август 2012</div>
							<div class="company__time">3 мес.</div>
							<div class="company__name"><a href="https://citronium.ru/">Citronium</a></div>
						</div>
						<div class="company__description">
							<p>
								Рефакторинг MVP в продукт Planstery (теперь StroyControl): canvas + svg для отображения чертежей
							</p>
						</div>
					</div>

					<div class="staff__element company--alt">
						<div class="company__profession">fullstack-разработчик</div>
						<div class="company__meta">
							<div class="company__period">январь..август 2012</div>
							<div class="company__time">8 мес.</div>
							<div class="company__name"><a href="https://ispring.ru">CPS Labs (теперь iSpring)</a></div>
						</div>
						<div class="company__description">
							<p>
								php, js, NodeJS
							</p>
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
				<div class="about">
					<div class="about__header">Обо мне</div>
					<div class="about__description">
						<p>
							<a href="https://higimo.ru/project">Портфолио</a>
						</p>
						<p>
							Бывший программист — говорю с инженерами и дизайнерами на одном языке.
						</p>
						<p>
							Развиваю команду, чтобы накапливать экспертизу и экономить на найме.
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
				<div class="school__name">Программная инженерия (ПС)</div>
				<div class="school__company">Поволжский государственный технологический университет</div>
			</div>
			</TextContainer>

			{/* <OtherResume /> */}
			{/* <ContactList /> */}
		</div>
	)
}

export default ResumeProduct2Page