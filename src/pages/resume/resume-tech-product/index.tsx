import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import avatar3 from 'assets/avatar3.jpg'

import '../resume-style.css'
import './style.css'

export const ResumeTechProductPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин резюме Tech product manager')

	return (
		<div className="resume-tech-product-page resume-page">
			<TextContainer>
				<img src={avatar3} className="resume-avatar" />
				<h2>Дмитрий Уткин, Tech product manager</h2>
				<div className="contact">
					<div className="contact__item"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
			</TextContainer>
			<TextContainer>
				<p>
					Product Manager с 5-летним опытом и 10-летним бэкграундом в разработке: full-stack, архитектура, tech leading. Ищу B2C SaaS, ML или внутреннюю платформу.
				</p>
				<p>
					Специализация: высоконагруженные системы (30М MAU), ML-продукты. Экспертиза в ML, UNIT-экономике, JTBD и Traction-моделировании, для обеспечения двузначного роста. Максимизирую вклад разработки в бизнес. Ращу разработчиков бизнес-задачами от джунов до синьёров.
				</p>
				<p>
					Верю в главенство причинно-следственных связей на основе данных. Опыт в разных процессных экосистемах: СБЕР, Студия Лебедева, стартап и SuperJob с миллиардным частным капиталом. Могу писать надёжный промышленный код и вайбкодить прототипы.
				</p>
				<p>
					Достижения: стратегия роста HRTech, с ростом выручки +11% YoY. Полный цикл discovery—delivery стартапу с CAC/LTV {'>'} 2. Сократил T2M 6→3 недели, проверяя гипотезы через A/B в 2 раза чаще.
				</p>
			</TextContainer>
			<TextContainer>
				<div className="expirience">
					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Founding Prouct Manager / Tech Lead</div>
								<div className="company__name"><a href="https://kidgu.ru">kidgu.ru</a></div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2025 — настоящее время</div>
								<div className="company__time">(11 месяцев)</div>
							</div>
						</div>
						<div className="company__description">
							<p>
								Сервис поиска детских специалистов. Совмещал CEO, Product, PMM, Tech Lead.
							</p>
							<p>
								<strong>Техническое лидерство</strong>: спроектировал архитектуру, контракты и БД. Выбрал стек и реализовал готовую к масштабированию платформу за 4 месяца, испытанную на 100 RPS.
							</p>
							<p>
								<strong>PM/PMM</strong>: проанализировал рынок, составил бизнес-план и UNIT-экономику, согласовал гипотезу спроектировал пользовательские флоу, проверил гипотезу CAC/LTV {'>'} 2.
							</p>
							<p>
								<strong>Управление</strong>: нанял и руководил командой из 3 человек, построив прозрачный scrum с delivery-дашбордом для стейкхолдера.
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
								Сервис поиска работы, HRtech, 30M MAU. Управлял кросс-функциональной командой из 30 человек, включая 3 продактов.
							</p>
							<p>
								<strong>Ключевой результат</strong>: увеличил LTV на 19% и выручку на 11% за счет ускорения списания балансных средств на 18%.
							</p>
							<p>
								<strong>ML</strong>: доказал необходимость топ-менеджменту, нанял компетентных специалистов, организовал внедрение ML-модели на линейной регрессии в поисковую выдачу. Отвечал за таргет и фичи, дизайн A/B-теста, получил +10% CR в отклик; +20% релевантности.
							</p>
							<p>
								<strong>Discovery</strong>: настроил процесс на основе JTBD, сегментации Cust-dev и traction-моделировании для поиска точек кратного роста. Утвердил стратегию у топ-менеджеров. В результате проверил 300 гипотез, где ROI {'>'} 100%.
							</p>
							<p>
								<strong>Процессы</strong>: отладил артефакты для delivery: PRD, БФТ, API, ERD, UML. Организовал дизайн-систему, ускорив T2M 6→3 недель.
							</p>
							<p>
								<strong>Управление legacy</strong>: организовал покрытие документацией 100% функций 25-летнего монолита. Получил 760 документов, что позволило меньше ошибаться при проектировании фичей, снизить bus-factor и онбордить новичков.
							</p>
							<p>
								<strong>Руководство</strong>: кросс-функциональная команда из 30 человек, включая 3 продакта. Вдвое увеличил команду (+15) с нулевым attrition, растил и нанимал сотрудников.
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
								Библиотекус — корпоративная библиотека. Выступил продакт-менеджером и разработчиком.
							</p>
							<p>
								<strong>Ключевой результат</strong>: свел потерю книг до нуля, упростил процесс выдачи книги до одного касания, нарастил библиотечный фонд в 2,5 раза.
							</p>
							<p>
								<strong>Маркетинг</strong>: перенёс фонд в удобное место, поддерживал интерес рассылкой.
							</p>
							<p>
								<strong>Сокращение потерь</strong>: в каждую книгу разместил экслибрис и RFID-метку.
							</p>
							<p>
								<strong>Разработка и UX</strong>: на физическом терминале реализовал сценарий взятия книги за одно касание.
							</p>
						</div>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Fullstack разработчик</div>
								<div class="company__name"><a href="https://ispring.ru">iSpring</a>, <a href="https://citronium.ru">Citronium</a>, <a href="https://r-top.ru">R-top</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">2012—2019</div>
							</div>
						</div>
						<p>
							Был fullstack, первые — продуктовые команды на джуновой позиции. В R-top дорос до руководителя разработки: развивал команду и поддерживал все 50 проектов агентства параллельно. Писал на React, Битрикс, Laravel.
						</p>
					</div>
				</div>
			</TextContainer>
		</div>
	)
}

export default ResumeTechProductPage
