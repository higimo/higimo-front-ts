import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import '../resume-style.css'
import './style.css'
import { Breadcrumps } from 'components/ui/breadcrumps'

// TODO: [LIGHT] добавить хлебные крошки

// TODO: [LIGHT] синхронизировать с остальными резюме
export const ResumeProductLeadPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, резюме Product Lead')

	return (
		<div className="resume-product-sss-page resume-page">
			<Breadcrumps />
			<TextContainer>
				<h2>Дмитрий Уткин, резюме Product Lead</h2>
				<div className="contact">
					<div className="contact__item small-text"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item small-text">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item small-text"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item small-text"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
				<p>
					Москва • офис • гибрид • удалённо
				</p>
			</TextContainer>
			<TextContainer>
				<p>
					Product Lead Manager с 10+ годами инженерного опыта и <strong>5+ лет развиваю продукты</strong> с десятками миллионов пользователей: search, marketplace и ML-ранжирование.
				</p>
				<p>
					<strong className="local-header">Ключевые результаты:</strong>
				</p>
				<ul>
					<li>увеличил <strong>revenue продукта на +11% YoY</strong></li>
					<li>увеличил <strong>LTV пользователей на +19%</strong></li>
					<li>внедрил <strong>ML-ранжирование</strong>, повысив релевантность откликов на <strong>+20%</strong></li>
					<li>руководил продуктовыми и инженерными командами <strong>до 30 человек</strong></li>
					<li>проверил <strong>300+ гипотез (A/B-тесты, Guardrail-метрики)</strong> на 4 платформах</li>
				</ul>
			</TextContainer>
			<TextContainer>
				<div className="expirience">

					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Product Lead</div>
								<div className="company__name">
									<a href="https://superjob.ru">SuperJob</a> (HRTech platform)
								</div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2022 — февраль 2025</div>
							</div>
						</div>
						<div className="company__description">
							<p>
								Владел продуктовым направлением <strong>поиска вакансий и откликов соискателей</strong>. Продукт обслуживает <strong>30M MAU и ~100M поисков вакансий в месяц</strong>. Вырос <strong>до лида</strong>.
							</p>
							<p>
								<strong className="local-header">Продуктовые инициативы:</strong>
							</p>
							<ul>
								<li><strong>разработал и защитил стратегию развития продуктового направления</strong>: сформировал видение, дерево метрик, roadmap с инициативами и ожидаемым uplift, ежеквартально корректировал стратегию</li>
								<li><strong>выстроил end-to-end дискавери-процесс</strong>: организовал системную генерацию гипотез из 13 источников (CustDev соискателей и работодателей, анализ данных), проверял гипотезы через <strong>A/B-тесты</strong> и guardrail-метрики</li>
								<li>увеличил <strong>выручку продуктового направления на +11% YoY, LTV на +19%</strong></li>
								<li>увеличил <strong>конверсию в целевое действие (отклик) на +10%</strong></li>
								<li><strong>запустил ML-ранжирование вакансий</strong>: выявил узкое место в поиске, защитил инициативу перед топ-менеджментом, после успешного A/B-теста масштабировал на всех пользователей, <strong>повысил релевантность откликов на +20%</strong></li>
								<li>повысил <strong>органическую посещаемость отзывов на +200%</strong>: выявил недостатки в процессе публикации, системно исправил их и опубликовал скрытые отзывы</li>
								<li>реализовал скрытие вакансий, на которые соискатель уже откликнулся, что дало <strong>+5% к конверсии в отклик</strong>; запустил виджет указания навыков, увеличив <strong>долю резюме с 2+ навыками на +25%</strong>; что в совокупности повысило <strong>качество соответствия соискателя и работодателя на +5%</strong></li>
							</ul>
							<p>
								<strong className="local-header">Ответственность и процессы:</strong>
							</p>
							<ul>
								<li>управлял P&L и юнит-экономикой, обеспечивая предсказуемость масштабирования и контроль маржинальности</li>
								<li>управлял кросс-функциональной командой из <strong>30 человек</strong>, включая <strong>3 подчинённых продакт-менеджеров</strong>, развивал их компетенции через 1-на-1 и performance review</li>
								<li>выстроил эффективный процесс delivery: сократил <strong>Time-to-Market с 6 недель до 3 недель</strong>, внедрив дизайн-систему и фокусируясь на переиспользовании интерфейсных решений</li>
								<li>организовал процесс управления бэклогом с вовлечением лидов разработки, обеспечив высокую вовлечённость команды, прозрачность приоритетов и качественную детализацию требований</li>
								<li>провёл документирование legacy-платформы, создал 760 документов, что <strong>ускорило онбординг новичков и снизило bus-factor</strong></li>
								<li>участвовал в формировании OKR на квартальной и годовой основе, определял и согласовывал планы направления с топ-менеджментом, балансируя приоритеты между стратегическими целями и потребностями смежных команд</li>
								<li>нанял <strong>15 сотрудников, обеспечив отсутствие текучести</strong>, что позволило масштабировать поставку продуктовой ценности</li>
								<li><strong>выстроил процесс коммуникации с маркетингом, продажами и техподдержкой</strong>, используя обратную связь как источник гипотез для бэклога</li>
							</ul>
						</div>
					</div>

					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Founding Product Manager / Tech Lead</div>
								<div className="company__name">
									<a href="https://kidgu.ru">КидГу.ру</a> (Сервис поиска специалистов для детей)
								</div>
							</div>
							<div className="company__timing">
								<div className="company__period">март 2025 — настоящее время</div>
							</div>
						</div>
						<div className="company__description">
							<p>
								Запустил маркетплейс <strong>с нуля до MVP за 4 месяца.</strong> Отвечал за продуктовую стратегию, экономику продукта и техническую архитектуру платформы.
							</p>
							<p>
								<strong className="local-header">Ключевые результаты:</strong>
							</p>
							<ul>
								<li>подтвердил <strong>юнит-экономику CAC/LTV {'>'} 2</strong></li>
								<li>привлёк первых пользователей и специалистов платформы</li>
								<li>запустил <strong>MVP маркетплейса за 4 месяца</strong></li>
								<li>разработал архитектуру SaaS-платформы, выдерживающую <strong>100 RPS</strong></li>
							</ul>
							<p>
								<strong className="local-header">Продуктовая ответственность:</strong>
							</p>
							<ul>
								<li>провёл анализ рынка и разработал <strong>бизнес-модель маркетплейса</strong></li>
								<li>сформировал <strong>продуктовую концепцию и roadmap</strong></li>
								<li>спроектировал <strong>основные пользовательские сценарии (поиск → сделка)</strong></li>
							</ul>
							<p>
								<strong className="local-header">Техническое лидерство:</strong>
							</p>
							<ul>
								<li>спроектировал <strong>архитектуру платформы, API-контракты и структуру БД</strong></li>
								<li>заложил архитектуру для <strong>горизонтального масштабирования</strong></li>
								<li>собрал и руководил <strong>командой разработки (4 человека)</strong></li>
							</ul>
						</div>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Frontend Product Engineer</div>
								<div className="company__name"><a href="https://daily.afisha.ru">Афиша Дейли</a> (Rambler / СБЕР)</div>
							</div>
							<div class="company__timing">
								<div class="company__period">ноябрь 2020 — февраль 2022</div>
							</div>
						</div>
						<p>
							Работал над развитием медиа-платформы <strong>(5M MAU)</strong> на пересечении продукта и разработки.
						</p>
						<p>
							<strong className="local-header">Ключевые результаты:</strong>
						</p>
						<ul>
							<li>переписал ключевые разделы продукта, повысив скорость разработки</li>
							<li>внедрил систему анализа пользовательского поведения</li>
							<li>курировал <strong>дизайн-систему продукта</strong></li>
						</ul>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Менеджер продукта</div>
								<div class="company__name"><a href="https://artlebedev.ru">Студия Лебедева</a></div>
							</div>
							<div class="company__timing">
								<div class="company__period">июнь 2019 — ноябрь 2020</div>
							</div>
						</div>
						<div class="company__description">
							<p>
								Отвечал за корпоративную библиотеку — <strong>Библиотекус</strong>, превратив внутренний сервис в полноценный <strong>цифровой продукт</strong>.
							</p>
							<p>
								<strong className="local-header">Ключевые результаты:</strong>
							</p>
							<ul>
								<li>сократил потери книг до <strong>0</strong>, внедрив систему экслибрисов и RFID-меток</li>
								<li>увеличил библиотечный фонд в <strong>2,5 раза</strong></li>
								<li>упростил процесс получения книги до <strong>одного касания терминала</strong></li>
								<li>вернул регулярное использование библиотеки сотрудниками</li>
							</ul>
							<p>
								<strong className="local-header">Продуктовая работа:</strong>
							</p>
							<ul>
								<li>спроектировал пользовательский сценарий работы с библиотекой через физический терминал</li>
								<li>внедрил рассылки и коммуникации для вовлечения пользователей</li>
							</ul>
						</div>
					</div>

					<div class="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div class="company__profession">Fullstack разработчик</div>
								<div class="company__name">
									<a href="https://ispring.ru">iSpring</a> • <a href="https://citronium.ru">Citronium</a> • <a href="https://r-top.ru">R-top</a> • <a href="https://artlebedev.ru">Студия Лебедева</a>
								</div>
							</div>
							<div class="company__timing">
								<div class="company__period">2012–2022</div>
							</div>
						</div>
						<p>
							Инженерный бэкграунд в веб-разработке. Начал карьеру как junior-разработчик в iSpring и Citronium, в R-top вырос до <strong>руководителя разработки</strong>.
						</p>
						<p>
							<strong className="local-header">Ключевые результаты:</strong>
						</p>
						<ul>
							<li>руководил разработкой и поддержкой <strong>50+ клиентских проектов</strong></li>
							<li>развивал инженерную команду и процессы разработки</li>
							<li>работал с современными веб-архитектурами и высоконагруженными системами</li>
						</ul>
					</div>
					<div class="expirience__element">
						<h2>Публичная активность</h2>
						<ul>
							<li>докладчик на профильных конференциях: <strong>ProIT fest, СберДизайн, Хабр, DigitalОттепель</strong></li>
							<li>ведущий и продюсер <strong>«ПродактКэмп Подкаст»</strong> — организую продакшен, приглашаю гостей, веду выпуски</li>
						</ul>
						<h2>Навыки</h2>
						<p>
							<strong>Product</strong>: product strategy • discovery (CustDev) • experimentation • marketplace economics • growth experiments • unit economics • search & ranking products
						</p>
						<p>
							<strong>Data & ML</strong>: ML ranking systems • product experimentation • user segmentation
						</p>
						<p>
							<strong>Technical</strong>: web architecture • analytics pipelines • опыт разработки (React / Laravel)
						</p>
					</div>
				</div>
			</TextContainer>
		</div>
	)
}

export default ResumeProductLeadPage
