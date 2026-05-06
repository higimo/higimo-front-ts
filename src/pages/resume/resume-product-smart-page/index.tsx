import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'

import avatar3 from 'assets/avatar3.jpg'

import '../resume-style.css'
import './style.css'

export const ResumeProductSmartPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин резюме на позицию Product manager')

	return (
		<div className="resume-product2-page resume-page">
			<Breadcrumps />
			<TextContainer>
				<img src={avatar3} className="resume-avatar" />
				<h2>Дмитрий Уткин, резюме на позицию Product manager</h2>
				<div className="contact">
					<div className="contact__item small-text"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item small-text">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item small-text"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item small-text"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
			</TextContainer>
			<TextContainer>
				<p className="small-text">
					Продакт-менеджер с 5-летним опытом. Экспертизой в ML, UNIT-экономике, JTBD, Traction-моделировании и кратном росте. Разработал платформу для стартапа. В HRTech создал стратегию роста, увеличившую выручку на 11%. Хорошо понимаю разработчиков и дизайнеров (10‑лет опыта разработчиком). Работал в разных процессных экосистемах от крупнейшего СБЕРа и Студии Лебедева, до стартапа на 5 человек.
				</p>
				<p className="small-text">
					Ищу внутрекорпоративные, платформенные, ML, B2C/B2B продукты для запуска и масштабирования.
				</p>
			</TextContainer>
			<TextContainer>
				<div className="expirience">
					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Founding Product Manager / Tech Lead</div>
								<div className="company__name"><a href="https://kidgu.ru">kidgu.ru</a></div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2025 — настоящее время</div>
								<div className="company__time">(11 месяцев)</div>
							</div>
						</div>
						<div className="company__description">
							<p>
								Сервис поиска детских специалистов, как YouDo. <strong>Главное достижение</strong>: с нуля создал команду, чтобы за 4 месяца запустить готовый к масштабированию MVP для проверки гипотезы спроса и выполнения обязательств перед инвестором.
							</p>
							<p>
								Полностью закрыл продуктовый цикл: от стратегии, экономики и проектирования до управления командой и delivery. Спроектировал ключевые флоу (поиск→сделка→чат), для проверки основной гипотезы: бесшовного мэтча родителей и специалистов. Для этого провёл рыночный анализ, разработал бизнес-план, юнит-экономику (CAC/LTV {'>'}2) и продуктовую стратегию. Тщательный discovery, позволил минимальной командой и временем достичь цели инвестора.
							</p>
							<p>
								Управление и руководство: сформировал команду из 3-х человек и Agile-процессом.  Фокусируясь на развитии специалистов, давал сложные вызовы, направлял и доводил до результата. Собрал дашборд delivery, для обеспечения прозрачности стейкхолдеру, команде, и оперативному снятию блокеров.
							</p>

						</div>
					</div>
					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Руководитель продакт-менеджеров</div>
								<div className="company__name"><a href="https://superjob.ru">SuperJob</a></div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2022 — февраль 2025</div>
								<div className="company__time">(3 года)</div>
							</div>
						</div>
						<div className="company__description">
							<p>
								HRtech-сервис поиска работы, как Хедхантер. <strong>Главное достижение</strong>: ускорил списание балансных средств на 18% (год к году). Это увеличило LTV +19%, и выручку +11%, через учащение отклика кандидатов. Для этого внедрил ML на linear regression по поведению пользователей, для релевантной поисковой выдачи вакансий, отдельно увеличил конверсию в отклик +10% и релевантность отклика +20%; в интерфейсе HR‑ов утроил выдачу резюме в поиске работы.
							</p>
							<p>
								Процессы: построил процесс Discovery на основе JTBD, сегментации, CustDev и Traction-моделировании для поиска точек кратного роста; и наладил Delivery: БФТ, API, ERD, UML. На базе Scrum, следя за T2M и результатами A/B‑тестов. Утвердил стратегию развития у топ‑менеджмента. Покрыл документацией (760 doc) 100% функций 25-летнего легаси, для оптимизации проектирования. Создал дизайн-систему, ускорив T2M, 6→3 недель. Проверил 300 гипотез, где ROI {'>'} 100%.
							</p>
							<p>
								Управление и руководство: в подчинении 3 продакта и кросс-функциональная команда из 30 человек. Увеличил команду вдвое (+15) с нулевым attrition, растил и нанимал сотрудников.
							</p>
						</div>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Lead frontend</div>
								<div className="company__name"><a href="https://daily.afisha.ru">Афиша Дейли</a> (СБЕР)</div>
							</div>
							<div class="company__timing">
								<div class="company__period">ноябрь 2020 — февраль 2022</div>
								<div class="company__time"></div>
							</div>
						</div>
						<p>
							Встраиваемый виджет e-commerce для площадок Рамблер-контура. Заново написанный сайт Афиши Дейли на современном стеке, для оптимизации найма и поддержки СМИ 5М MAU. Организовывал процессы и разрабатывал, для ведения своей зоны ответственности.
						</p>
						<p>
							<strong>Ключевые достижения</strong>: реализация дизайн-системы для ускорения T2M, реализация архитектуры и системы click-flow для аналитики пользовательского поведения, для оптимизации пользовательских путей и тренировки ML.
						</p>
					</div>

					<div class="expirience__element company">
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
								Библиотекус — корпоративная библиотека. Организовал процесс, чтобы появился экслибрис, а учёт взятия книги вёлся через пропускную систему так же просто, как взятие с полки. Что сократило утерю книг до нуля. Рассылка и интерес к книгам, позволили вырастить фонд в 2,5 раза.
							</p>
						</div>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">10 лет фулл‑стек разработки</div>
							</div>
							<div class="company__timing">
								<div class="company__period">2012—2022</div>
								<div class="company__time">(10 лет)</div>
							</div>
						</div>
						<p className="small-text">
							<a href="https://r-top.ru">R-top</a>, <a href="https://citronium.ru">Citronium</a> <a href="https://ispring.ru">iSpring</a>. На технологиях React, Битрикс, Laravel.
						</p>
					</div>
				</div>
			</TextContainer>
		</div>
	)
}

export default ResumeProductSmartPage
