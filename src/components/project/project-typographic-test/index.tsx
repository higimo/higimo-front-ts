import { TextContainer } from 'components/ui/text-container'
import { FunctionComponent } from 'preact'
import { Fragment } from 'preact/jsx-runtime'

// TODO: [LIGHT] вынести в отдельный UI компонент
const TypographicHeader: FunctionComponent = (props) => (
	<TextContainer style="margin-top: 256px;">
		<h2>{props.children}</h2>
	</TextContainer>
)

export const ProjectTypographicTest: FunctionComponent = () => {
	return (
		<Fragment>



			<TypographicHeader>Формулировка задачи</TypographicHeader>
			<div>
				<div class="task">
					<div class="task__text">
						Собрать собственную продуктовую команду
					</div>
				</div>
				<div class="task">
					<div class="task__text">
						Очень длинный текст, для тестирования двух строк, на случай важных текстов, когда они понадобятся, а сократить невозможно
					</div>
				</div>
				<div class="task">
					<div class="task__text">
						А это с датой релиза
					</div>
					<div class="task__date">
						1.07.2018
					</div>
				</div>
			</div>



			<TypographicHeader>Ссылка на сайт</TypographicHeader>
			<div>
				<div class="site-link">
					<a href="http://kcznn.ru/">kcznn.ru</a>
				</div>
				<div class="site-link">
					<a href="http://kcznn.ru/">kcznn.ru</a> (наполняется заказчиком)
				</div>
			</div>



			<TypographicHeader>Куски кода</TypographicHeader>
			<div>
				<pre>
					<div class="announce__text">
						{`
							\\ALS\\Helper\\Cache::cached([
								'ttl'  => 60,
								'hash' => $arParams, // по умолчанию []
								'dir'  => '/iblock/section/list/',
								'func' => function() {
									return 'cached string';
								}
							]);
						`.replace(/\t{7}/ig, '')}
					</div>
				</pre>
				<pre>
					<div class="announce__text">
						{`
							method: product/getList
							options: {
								select: ['id', name'],
								filter: {
									"id": 301,
								},
							}
						`.replace(/\t{7}/ig, '')}
					</div>
				</pre>
			</div>



			<TypographicHeader>Обычные тексты</TypographicHeader>
			<div>
				<TextContainer>
					<h3>Три абзаца</h3>
				</TextContainer>
				<div class="announce__text">
					<p>
						КидГу.ру — стартап на pre-seed стадии. Нет HR-отдела, нет бренда работодателя, бюджет ограничен. Нам нужны дизайнер, фронтендер и бэкендер.
					</p>
					<p>
						Аутсорс предлагает «мидлов», взамен на свою маржу 20–30% сверху и риском, что реальные навыки окажутся ниже заявленного.
					</p>
					<p>
						Решено взять найм на себя и сделать за время, за которое агентство подпишет договор.
					</p>
				</div>
				<TextContainer>
					<h3>Один абзац</h3>
				</TextContainer>
				<div class="announce__text">
					<p>
						Если на старте нанять свою команду, вместо аутсорса, сэкономим до 30 % бюджета, которые ушли бы на маржу агентства, и по меньшей мере ту же квалификацию, за те же деньги
					</p>
				</div>
				<TextContainer>
					<h3>С заголовками</h3>
				</TextContainer>
				<div class="announce__text">
					<h2>Второй заголовок</h2>
					<p>
						Если на старте нанять свою команду, вместо аутсорса, сэкономим до 30 % бюджета, которые ушли бы на маржу агентства, и по меньшей мере ту же квалификацию, за те же деньги
					</p>
					<h3>Третий заголовок</h3>
					<p>
						Если на старте нанять свою команду, вместо аутсорса, сэкономим до 30 % бюджета, которые ушли бы на маржу агентства, и по меньшей мере ту же квалификацию, за те же деньги
					</p>
					<h3>Третий заголовок</h3>
					<p>
						Если на старте нанять свою команду, вместо аутсорса, сэкономим до 30 % бюджета, которые ушли бы на маржу агентства, и по меньшей мере ту же квалификацию, за те же деньги
					</p>
					<p>
						Решено взять найм на себя и сделать за время, за которое агентство подпишет договор.
					</p>
				</div>
			</div>



			<TypographicHeader>Оформление текста</TypographicHeader>
			<div class="announce__text">
				<p>
					В начале года <strong>по результатам Стратсессии</strong>
				</p>
				<p>
					Обычный текст <em>курсивный текст</em>.
				</p>
				<p>
					{/* @ts-ignore */}
					Обычный текст <strike>strike текст</strike>.
				</p>
			</div>



			<TypographicHeader>Ссылки</TypographicHeader>
			<div class="announce__text">
				<h3>В заголовке <a href="https://superjob.ru">SuperJob</a></h3>
				<p>
					В обычном <a href="https://www.superjob.ru/results2024/">абзаце</a>
				</p>
				<ol>
					<li>Внутри <a href="https://productcamppodcast.mave.digital/ep-2">списка</a></li>
				</ol>
			</div>



			<TypographicHeader>Списки</TypographicHeader>
			<div class="announce__text">
				<ol>
					<li>Первое</li>
					<li>
						Второе
						<ol>
							<li>Вложенное</li>
							<li>Вложенное 2</li>
						</ol>
					</li>
					<li>
						Третье
						<ul>
							<li>Вложенное</li>
							<li>Вложенное 2</li>
						</ul>
					</li>
				</ol>
				<ul>
					<li>Первое</li>
					<li>
						Второе
						<ol>
							<li>Вложенное</li>
							<li>Вложенное 2</li>
						</ol>
					</li>
					<li>
						Третье
						<ul>
							<li>Вложенное</li>
							<li>Вложенное 2</li>
						</ul>
					</li>
				</ul>
			</div>



			<TypographicHeader>Фактоиды</TypographicHeader>
			<div>
				<div class="factoid-gallery">
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">3</div>
						<div class="factoid-gallery__description">недели</div>
					</div>
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">65 000</div>
						<div class="factoid-gallery__description">откликов</div>
					</div>
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">40</div>
						<div class="factoid-gallery__description">собеседований</div>
					</div>
				</div>
				<div class="factoid-gallery">
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">41</div>
						<div class="factoid-gallery__description">тайтл за год</div>
					</div>
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">8</div>
						<div class="factoid-gallery__description">10-бальных</div>
					</div>
					<div class="factoid-gallery__item">
						<div class="factoid-gallery__counter">4</div>
						<div class="factoid-gallery__description">9-бальных</div>
					</div>
				</div>
				<div class="result-metric">
					<div class="result-metric__metric">
						+20 %
					</div>
					<div class="result-metric__description">
						релевантность отклика
					</div>
				</div>
			</div>



			<TypographicHeader>Громкие слова</TypographicHeader>
			<div>
				<TextContainer>
					<h3>Единица смысла</h3>
				</TextContainer>
				<div class="unit-of-sense">
					<div class="unit-of-sense__main">
						Быстрый запуск возможен, когда определяешь минимальный набор функций, приносящих максимальную пользу
					</div>
				</div>
				<div class="unit-of-sense">
					<div class="unit-of-sense__main">
						Нужно унифицировать элементы.
					</div>
					<div class="unit-of-sense__note">
						— боль веб-мастера
					</div>
				</div>


				<TextContainer>
					<h3>Год одним словом</h3>
				</TextContainer>
				<div class="word-of-the-year">Татьяна</div>
			</div>



			<TypographicHeader>Оформление блоков</TypographicHeader>
			<div>
				<TextContainer>
					<h3>Письмо</h3>
				</TextContainer>
				<div class="letter">
					<p>
						Команда студии — боевой десант, объединённый менеджером для работы над проектом. Команда всегда может мутировать присоединив или отсоединив специалиста.
					</p>
					<p>
						Технолог в студии — специалист, который умеет делать сайты, согласно студийным стандартам качества.
					</p>
				</div>
				<TextContainer>
					<h3>Цитата</h3>
				</TextContainer>
				<div class="announce__text">
					<p>
						от Димы Легостаева:
					</p>
					<blockquote>
						<p>
							Только, кстати, надо проверить конструкцию самовара, выглядит, будто все пиво из него нельзя вылить через носик. И от пива носик так отражаться не будет)
						</p>
						<p>
							Ну и прозрачная часть не будет такой блик давать как золотая. И у стекла толщина должна быть.
						</p>
					</blockquote>
				</div>
				<TextContainer>
					<h3>Важный текст</h3>
				</TextContainer>
				<div class="important-board">
					<div class="announce__text">
						<p>
							Системный архитектор проектирует саморегулируемые, и, как следствие, устойчивые процессы. Для этого задаёт структуры: роль, процессы к ним и автономность для эффективной работы.
						</p>
					</div>
				</div>
				<TextContainer>
					<h3>Пример</h3>
				</TextContainer>
				<div class="example">
					<div class="announce__text">
						<p>
							Системный архитектор проектирует саморегулируемые, и, как следствие, устойчивые процессы. Для этого задаёт структуры: роль, процессы к ним и автономность для эффективной работы.
						</p>
					</div>
				</div>
				<TextContainer>
					<h3>Сценарии использования</h3>
				</TextContainer>
				<div class="case">
					<div class="case__item">
						<p>
							1. Инвестор видит рост CAC на 20%, при сохранении LTV и Retention D30
						</p>
						<p>
							<strong>Проблема</strong>: канал приводит немотивированный трафик, либо креатив перестал попадать в ЦА.
						</p>
						<p>
							<strong>Решение</strong>: маркетолог останавливает кампанию и перераспределяет бюджет в категорию рефералов, где ниже CAC в 3 раза.
						</p>
					</div>
				</div>
			</div>



			<TypographicHeader>Артефакты</TypographicHeader>
			<div>
				<TextContainer>
					<h3>Таблица на гридах</h3>
				</TextContainer>
				<div class="grid-table-two">
					<div class="grid-table-two__header">Вопрос</div>
					<div class="grid-table-two__header">Комментарий</div>

					<div class="grid-table-two__section"></div>
					<div class="grid-table-two__cell">Прошлый опыт</div>
					<div class="grid-table-two__cell">Валидирую, испытал ли он его на себе на самом деле</div>

					<div class="grid-table-two__section"><h2>База</h2></div>
						<div class="grid-table-two__cell">Писал тесты?</div>
						<div class="grid-table-two__cell">Валидирую, что средняя компания иногда их пишет, но это оценивается как благо и часть процесса</div>

						<div class="grid-table-two__cell">SQL: как реализуешь многое ко многим?</div>
						<div class="grid-table-two__cell">Через третью таблицу</div>

					<div class="grid-table-two__section"><h2>Кейсы</h2></div>
						<div class="grid-table-two__cell">Как бы сделал кеширование в поиске?</div>
						<div class="grid-table-two__cell">Валидирую, что понимает плюсы и минусы кэша, и показывает точки для кеширования. Правильный ответ — кэш не нужен</div>

						<div class="grid-table-two__cell">Какие бы сделал эндпоинты для личного кабинета специалиста?</div>
						<div class="grid-table-two__cell">Валидирую, разделение REST-сущностей и проговаривание пользы переиспользуемости. Правильный ответ — три</div>

						<div class="grid-table-two__cell">Сколько времени займёт реализация эндпоинтов?</div>
						<div class="grid-table-two__cell">Валидирую, описание временных затрат. Само время значения не имеет</div>
				</div>
				<TextContainer>
					<h3>Таблица семантическая</h3>
				</TextContainer>
				<div class="announce__info-table">
					<table style="min-width: 640px;">
						<tbody>
							<tr>
								<td>Концерт Миры Миядзаки с оркестром</td>
								<td></td>
								<td>13 января</td>
							</tr>
							<tr>
								<td>Пять языков любви</td>
								<td>Винзавод, The Place</td>
								<td>январь</td>
							</tr>
							<tr>
								<td>Любовь от и до</td>
								<td>Сытинской типографии </td>
								<td>март</td>
							</tr>
							<tr>
								<td>Водонапорная башня</td>
								<td>Старая Руса</td>
								<td>июнь</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>



			<TypographicHeader>Скриншоты сайта</TypographicHeader>
			<div>
				<TextContainer>
					<p>Полная ссылка с подписью</p>
				</TextContainer>
				<div class="announce__picture">
					<a class="browser" href="https://deploy-calendar.ru/">
						<div class="browser__topbar">
							<div class="browser__address">deploy-calendar.ru</div>
						</div>
						<div class="browser__screen">
							<img src="/assets/project/higimo/deploy-calendar/asset/img/index.png" />
						</div>
					</a>
				</div>
				<div class="announce__picture-note">
					<p>
						Первый абзац
					</p>
					<p>
						Второй абзац
					</p>
				</div>
				<TextContainer>
					<p>Без подписи</p>
				</TextContainer>
				<div class="announce__picture">
					<a class="browser" href="https://higimo.github.io/timer/build/">
						<div class="browser__topbar">
							<div class="browser__address">higimo.github.io/timer/build/</div>
						</div>
						<div class="browser__screen">
							<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
						</div>
					</a>
				</div>
				<TextContainer>
					<p>Без ссылки</p>
				</TextContainer>
				<div class="announce__picture">
					<a class="browser">
						<div class="browser__topbar">
							<div class="browser__address">higimo.github.io/timer/build/</div>
						</div>
						<div class="browser__screen">
							<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
						</div>
					</a>
				</div>
				<TextContainer>
					<p>Без бошки</p>
				</TextContainer>
				<div class="announce__picture">
					<a class="browser">
						<div class="browser__screen">
							<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
						</div>
					</a>
				</div>
				<TextContainer>
					<p>Без бошки</p>
				</TextContainer>
				<div class="announce__picture">
					<a class="browser">
						<div class="browser__screen">
							<img src="/assets/project/timecalc/fullstack/asset/img/index.png" className="screen" />
						</div>
					</a>
				</div>
				<TextContainer>
					<p>Просто картинка</p>
				</TextContainer>
				<div class="announce__picture">
					<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/delegirovanie.jpg" />
				</div>
				<TextContainer>
					<p>Вертикальная картинка</p>
				</TextContainer>
				<div class="announce__picture">
					<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/IMG_3169.jpeg" class="announce__big-pic" />
				</div>
			</div>



			<TypographicHeader>Горизонтальная галерея</TypographicHeader>
			<div class="announce__horizontal horizontal-pic-gallery">
				<div class="horizontal-pic-gallery__content">
					<div class="horizontal-item">
						<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/689a79717efeb6f48f6779ede0a3af8b.jpg" />
						<div class="horizontal-item__note">
							<p>
								Не моё достижение, но Алёнка дипломированный мехматянин
							</p>
						</div>
					</div>
					<div class="horizontal-item">
						<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/IMG_3260.jpeg" />
						<div class="horizontal-item__note">
							<p>
								Алёна
							</p>
						</div>
					</div>
					<div class="horizontal-item">
						<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/689a79717efeb6f48f6779ede0a3af8b.jpg" />
						<div class="horizontal-item__note">
							<p>
								Не моё достижение, но Алёнка дипломированный мехматянин
							</p>
						</div>
					</div>
					<div class="horizontal-item">
						<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/IMG_3260.jpeg" />
						<div class="horizontal-item__note">
							<p>
								Алёна
							</p>
						</div>
					</div>
				</div>
			</div>



			<TypographicHeader>Кино года</TypographicHeader>
			<div>
				<table class="announce__card-table">
					<tbody>
						<tr>
							<td>
								<a href="https://www.kinopoisk.ru/film/677893/">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/stajer.jpg" />
								</a>
							</td>
							<td>
								<p>
									<strong>Стажёр</strong>
								</p>
								<p>
									Лучший душевный фильм года
								</p>
							</td>
						</tr>
						<tr>
							<td>
								<a href="https://www.kinopoisk.ru/series/6012599/">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2025/asset/img/Pasted image 20260102155306.png" />
								</a>
							</td>
							<td>
								<p>
									<a href="https://www.kinopoisk.ru/series/6012599/"><strong>Одна из многих</strong></a>
								</p>
								<p>
									Красивая сказка, <a href="https://t.me/higimoblog/3125">как человек сохраняет свой мир и никогда из него не выйдет</a>. Чистоплотная японщина. Смотреть при недостатке умности в организме.
								</p>
							</td>
						</tr>
					</tbody>
				</table>
				<TextContainer>
					<h3>Хуёвые фильмы года</h3>
				</TextContainer>
				<table class="announce__pic-table">
					<tbody>
						<tr>
							<td>
								<a href="https://www.kinopoisk.ru/film/1178137/">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/midsommar.jpg" />
								</a>
							</td>
							<td>
								<a href="https://www.kinopoisk.ru/film/5354707/">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/godzilla.jpg" />
								</a>
							</td>
							<td>
								<a href="https://www.kinopoisk.ru/film/602694/">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/the_double.jpg" />
								</a>
							</td>
						</tr>
						<tr>
							<td><strong>Солнцестояние</strong></td>
							<td><strong>Годзилла: Минус один</strong></td>
							<td><strong>Двойник</strong></td>
						</tr>
					</tbody>
				</table>
			</div>



			<TypographicHeader>Лейауты</TypographicHeader>
			<div>
				<TextContainer>
					<p>30% × 3</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--30" style="background: #fcc">
						1
					</div>
					<div class="container-panel--30" style="background: #cfc">
						2
					</div>
					<div class="container-panel--30" style="background: #ccf">
						3
					</div>
				</div>
				<TextContainer>
					<p>30% + 70%</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--30" style="background: #fcc">
						1
					</div>
					<div class="container-panel--70" style="background: #cfc">
						2
					</div>
				</div>
				<TextContainer>
					<p>70% + 30%</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--70" style="background: #fcc">
						1
					</div>
					<div class="container-panel--30" style="background: #cfc">
						2
					</div>
				</div>
				<TextContainer>
					<p>50% + 50%</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--50" style="background: #fcc">
						1
					</div>
					<div class="container-panel--50" style="background: #cfc">
						2
					</div>
				</div>
			</div>



			<TypographicHeader>Лейауты + картинки + описание</TypographicHeader>
			<div>
				<TextContainer>
					<p>30% × 3</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--30" style="background: #fcc">
						<div class="announce__text">
							<p>
								Нулевой абзац
							</p>
						</div>
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
					<div class="container-panel--30" style="background: #cfc">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
					<div class="container-panel--30" style="background: #ccf">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
						<div class="announce__text">
							<p>
								Нулевой абзац
							</p>
						</div>
					</div>
				</div>
				<TextContainer>
					<p>30% + 70%</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--30" style="background: #fcc">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
					<div class="container-panel--70" style="background: #cfc">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
				</div>
				<div class="container-row">
					<div class="container-panel--70" style="background: #ccf">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
					<div class="container-panel--30" style="background: #cfc">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
				</div>
				<div class="container-row">
					<div class="container-panel--30" style="background: #fcc">
						<div class="announce__text">
							<p>
								Нулевой абзац
							</p>
							<p>
								Нулевой абзац
							</p>
							<p>
								Нулевой абзац
							</p>
						</div>
					</div>
					<div class="container-panel--70" style="background: #cfc">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
						<div class="announce__picture-note">
							<p>
								Первый абзац
							</p>
						</div>
					</div>
				</div>
				<div class="container-row">
					<div class="container-panel--70" style="background: #ccf">
						<div class="announce__picture">
							<a class="browser">
								<div class="browser__screen">
									<img src="/assets/project/timecalc/fullstack/asset/img/index.png" />
								</div>
							</a>
						</div>
					</div>
					<div class="container-panel--30" style="background: #cfc">
						<div class="announce__picture-note--mini">
							<p>
								Правильный мини-абзац
							</p>
						</div>
						<div class="announce__picture-note announce__picture-note--mini">
							<p>
								Мини-абзац с паршивым отступом, надо пофиксить
							</p>
						</div>
						<div class="announce__picture-note announce__picture-note--sticky">
							<p>
								Стики абзац
							</p>
						</div>
					</div>
				</div>
				<TextContainer>
					<p>Рекурсивное</p>
				</TextContainer>
				<div class="container-row">
					<div class="container-panel--70" style="background: #fcc">
						<div class="announce__text">
							<p>
								Hello
							</p>
						</div>
					</div>
					<div class="container-panel--30">
						<div class="container-row">
							<div class="container-panel--50" style="background: #ccf">
								<div class="announce__picture">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/camphoto_1290326580.jpg" class="announce__big-pic" />
								</div>
							</div>
							<div class="container-panel--50" style="background: #cfc">
								<div class="announce__picture">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/IMG_3169.jpeg" class="announce__big-pic" />
								</div>
								<div class="announce__picture-note--mini">
									<p>
										В офисе ВК
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="container-row">
					<div class="container-panel--50" style="background: #fcc">
						<div class="announce__text">
							<p>
								Hello
							</p>
						</div>
					</div>
					<div class="container-panel--50">
						<div class="container-row">
							<div class="container-panel--50" style="background: #ccf">
								<div class="announce__picture">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/camphoto_1290326580.jpg" class="announce__big-pic" />
								</div>
							</div>
							<div class="container-panel--50" style="background: #cfc">
								<div class="announce__picture">
									<img loading="lazy" src="/assets/project/bitrix/new-year-2024/asset/img/IMG_3169.jpeg" class="announce__big-pic" />
								</div>
								<div class="announce__picture-note--mini">
									<p>
										В офисе ВК
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>



			<TypographicHeader>Сектора для итогов года</TypographicHeader>
			<div>
				<TextContainer>
					<p>Только сектор</p>
				</TextContainer>
				<div class="sector-sum" style="background: #fcc;">
					<h2 class="announce__main-header" style="background: #cfc;">Прошедший год одним словом</h2>
				</div>
				<TextContainer>
					<p>Только сектор и несколько вложенных</p>
				</TextContainer>
				<div class="sector-sum" style="background: #fcc;">
					<div class="sector-sum--half" style="background: #cfc;">
						<div class="announce__text" style="background: #fff;">
							<p>
								Первый вложенный блок
							</p>
						</div>
					</div>

					<div class="sector-sum--half" style="background: #ccf;">
						<div class="announce__text" style="background: #fff;">
							Второй вложенный блок
						</div>
					</div>
				</div>
				<TextContainer>
					<p>Иной подход</p>
				</TextContainer>
				<div class="announce__sector" style="background: #fcc;">
					<div class="announce__text">
						<p>Первый уровень вложенности</p>
					</div>
					<div class="announce__sector" style="background: #cfc;">
						<div class="announce__text">
							<p>Второй уровень вложенности первый блок</p>
						</div>
					</div>
					<div class="announce__sector" style="background: #ccf;">
						<div class="announce__text">
							<p>Второй уровень вложенности второй блок</p>
						</div>
					</div>
				</div>
			</div>




			<TypographicHeader>ТГ чаты</TypographicHeader>
			<div className="tg-chat">
				<div className="tg-message tg-message--left">
					Привет! Я администратор. Выберите опцию из меню ниже 👇
					<div className="tg-message__time">14:30</div>
				</div>
				<div className="tg-chat__keyboard tg-chat__keyboard--inline">
					<div className="keyboard-row">
						<div className="keyboard-btn">Мои заказы</div>
						<div className="keyboard-btn">Избранное</div>
					</div>
				</div>

				<div className="tg-message tg-message--right">
					Здравствуйте!
					<div className="tg-message__time">14:31</div>
				</div>

				<div className="tg-message tg-message--system">
					Администратор обновил клавиатуру
				</div>

				<div className="tg-chat__input">
					<div className="tg-chat__keyboard">
						<div className="keyboard-row">
							<div className="keyboard-btn">Мои заказы</div>
							<div className="keyboard-btn">Избранное</div>
						</div>
					</div>
				</div>
			</div>



		</Fragment>
	)
}
