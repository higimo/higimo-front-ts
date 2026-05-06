import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'

import '../resume-style.css'
import './style.css'

export const ResumeProductPage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин, Senior Product Manager')

	return (
		<div className="resume-product-sss-page resume-page">
			<Breadcrumps />
			<TextContainer>
				<h2>Дмитрий Уткин, Senior Product Manager</h2>
				<div className="contact">
					<div className="contact__item"><a href="tel:+79661579085">+7 (966) 157-90-85</a></div>
					<div className="contact__item">TG: <a href="https://t.me/higimo">@higimo</a></div>
					<div className="contact__item"><a href="mailto:higimo@gmail.com">higimo@gmail.com</a></div>
					<div className="contact__item"><a href="https://higimo.ru">higimo.ru</a></div>
				</div>
				<p>
					Москва • офис • гибрид • удалённо
				</p>
			</TextContainer>
			<TextContainer>
				<p>
					Senior Product Manager с 10+ годами инженерного опыта и <strong>5+ лет развиваю продукты</strong> с десятками миллионов пользователей: search, marketplace и ML-ранжирование.
				</p>
				<p>
					<strong className="local-header">Ключевые результаты:</strong>
				</p>
				<ul>
					<li>увеличил <strong>revenue продукта на +11% YoY</strong></li>
					<li>увеличил <strong>LTV пользователей на +19%</strong></li>
					<li>внедрил <strong>ML-ранжирование</strong>, повысив релевантность откликов на <strong>+20%</strong></li>
					<li>руководил продуктовыми и инженерными командами <strong>до 30 человек</strong></li>
					<li>проверил <strong>300+ гипотез (A/B-тесты, Guardrail)</strong> на 4 платформах</li>
				</ul>
			</TextContainer>
			<TextContainer>
				<div className="expirience">
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
					<div className="expirience__element company">
						<div className="company__meta">
							<div className="company__staff">
								<div className="company__profession">Руководитель продакт-менеджеров</div>
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
								Владел продуктовым направлением <strong>поиска вакансий и откликов соискателей</strong>. Продукт обслуживает <strong>30M MAU и ~100M поисков вакансий в месяц</strong>. Вырос <strong>до руководителя</strong>.
							</p>
							<p>
								<strong className="local-header">Ключевые результаты:</strong>
							</p>
							<ul>
								<li>увеличил <strong>выручку продукта на +11% YoY</strong></li>
								<li>увеличил <strong>LTV пользователей на +19%</strong></li>
								<li>повысил <strong>конверсию в отклик на +10%</strong></li>
								<li>внедрил <strong>ML-ранжирование вакансий</strong>, повысив релевантность отклика на <strong>+20%</strong></li>
								<li>сократил <strong>time-to-market с 6 месяцев до 3 недель</strong></li>
								<li>нанял <strong>15 сотрудников</strong>, сформировав продуктовые команды без текучести</li>
							</ul>
							<p>
								<strong className="local-header">Продуктовые инициативы:</strong>
							</p>
							<ul>
								<li>выявил ключевые узкие места поиска вакансий и внедрил <strong>ML-ранжирование вакансий</strong></li>
								<li>запустил продуктовую систему discovery — сегментация, CustDev, A/B-тесты</li>
								<li>проверил <strong>300+ гипотез (A/B-тесты, Guardrail)</strong> на 4 платформах</li>
								<li>инициировал внедрение дизайн-системы для ускорения разработки</li>
							</ul>
							<p>
								<strong className="local-header">Платформа и процессы:</strong>
							</p>
							<ul>
								<li>организовал документацию <strong>legacy-платформы (760 документов)</strong>, снизив bus-factor и ускорив onboarding команд</li>
								<li>управлял командами через <strong>1-1, ретроспективы и продуктовые метрики</strong></li>
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

export default ResumeProductPage
