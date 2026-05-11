
// TODO: проверить что хуки и вспомогательные функции до сих пор используются в проекте (почистить неиспользуемое)

// TODO: уменьшить бандл, там d3 что-то косячно импортируется

// https://habr.com/ru/articles/321106/
// https://github.com/preactjs/signals/tree/main
// TODO vite.config.ts отделяет чанк с библиотекой, но не подгружает её асинхронно, так что для всех страни подгружается d3 и openapi

// https://github.com/antfu-collective/taze
// https://github.com/antfu/export-size
// https://icones.js.org/
// https://github.com/antfu/eslint-typegen
// https://unplugin.unjs.io/showcase/
// https://unstorage.unjs.io/

// https://www.npmjs.com/package/uncrypto/v/0.1.3 для нокии

// https://node-modules.dev/report/install-size это можно использовать для того, чтобы вычищать node_modules через пуллреквесты, самые большие в мусорку

// https://excalidraw.smallweb.run/d/drawing
// https://bsky.app/profile/jsr.io
// https://jsr.io/docs/introduction
// https://jsr.io/packages
// https://t.me/alexnozer_dev/207
// https://evilmartians.com/chronicles/how-to-make-your-open-source-popular
// https://mastodon.social/@sitnik_ru
// https://habr.com/ru/companies/jugru/articles/444652/
// https://mastodon.online/@vas3k
// http://paperjs.org/tutorials/

// TODO https://github.com/welldone-software/react-component-splitter кажется очень удобным

// TODO eslint

// TODO Добавить аналитику поблочную

// https://habr.com/ru/articles/673640/ добавить куда-то

// TODO интересный код событий для форм https://doka.guide/js/queuemicrotask/

// https://higimo.ru/vk/
// https://github.com/higimo/vk-photos-react/blob/master/src/scss/index.scss
// https://github.com/higimo/analytics
// https://github.com/higimo/list-new/blob/master/src/routes/list-list-add/index.js
// https://github.com/higimo/museum

// TODO: использовать Wouter

// TODO: Как настроить PWA на этом стеке?

// TODO link #2196f3
// #3984d4 -- неплохой синий


// TODO: страницу для итогов года: скрин нокии и скрин обхожу Москву

// TODO Добавить подкаст Хорошие новости в Блоги
// TODO Добавить подкаст Кэмпа в Блоги
// TODO в портфолио бот Хигимору

{/* <h1>Конспект по верстке эмейлов</h1>
<p>
	Проследите за тем, чтобы письмо адекватно отображалось в Outlook, Gmail, Yandex и Mail.ru — этого достаточно
</p> */}


// Дневник своих маленьких успехов

// TODO: ну пусть люди прям в списки могут заходить?
// TODO: показать иконки крепостей
// TODO: год посещения
// TODO: Список российских городов для посещения
// TODO: Города для посещений
// TODO: Список городов близ Москвы
// TODO: Показать на сайте
// TODO: Главные мечети посетил
// TODO: Преображенская крепость
// Вулканы
// Горелый
// TODO: Добавить регионы городов
// TODO: Был в 4 городах, в 5 заброшенных городах, в 30 крепостях
// 2025 год население
// TODO: искать: Регионы России Статистический сборник
// Научиться p3 express
// Купить книгу Цель: процесс непрерывного улучшения16+ Элияху Голдратт, Джефф Кокс
// Обхожу Метро https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B9_%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D0%BD%D0%B0
// 2022-03-10 Ушёл из Рамблера
// 2015-09-01 пришёл в Эртоп
// 2016-12-31 Ушёл из Эртоп

// TODO: Получается всё отсюда надо перенести на страницу
// TODO: Фильтровать точки здесь, а в дочерний с картой передавать точки, пусть рисует


// TODO: Почистить хомяк от неиспользуемых компонентов




// TODO: Хуки
// 	https://usehooks.com/useDebounce/
// 	https://usehooks.com/useOnScreen/
// 	https://usehooks.com/usePrevious/
// 	https://usehooks.com/useOnClickOutside/
// 	https://usehooks.com/useAnimation/
// 	https://usehooks.com/useWindowSize/
// 	https://usehooks.com/useHover/
// 	https://usehooks.com/useLocalStorage/
// 	https://usehooks.com/useMedia/
// 	https://usehooks.com/useLockBodyScroll/
// 	https://usehooks.com/useSpring/
// 	https://usehooks.com/useHistory/
// 	https://usehooks.com/useScript/
// 	https://usehooks.com/useKeyPress/
// 	https://fireship.io/snippets/use-media-query-hook/





Для быстрой и комплексной проверки лучше всего подойдёт Knip. Он даст наиболее полную картину и не требует глубокой настройки.

Если вам нужен глубокий анализ взаимосвязей компонентов, обратите внимание на @gld5000-cli/dependency-finder и react-component-graphify. Они предоставляют детальную информацию, которая поможет безопасно рефакторить проект.

Для регулярных проверок «на лету» можно интегрировать ESLint с соответствующими правилами (no-unused-vars, no-unused-modules). Это не заменит полноценный анализ связей между файлами, но поможет поддерживать порядок в процессе разработки.
