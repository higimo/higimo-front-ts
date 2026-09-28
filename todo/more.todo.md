https://github.com/dgamboa/useapi-hook/blob/main/hooks/useApi.js
https://amberfung.medium.com/react-custom-hooks-2-use-event-listener-hook-04b927c34b13
https://amberfung.medium.com/react-custom-hooks-3-use-util-hook-d06cd2f96151





```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Состояния</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 480px;
      margin: 40px auto;
      padding: 0 16px;
      background: #f7f7f8;
      color: #222;
    }

    .state {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 32px 24px;
      margin-bottom: 16px;
      background: #fff;
      text-align: center;
    }

    .state__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
    }

    .state__text {
      margin: 0;
      font-size: 14px;
      color: #666;
    }

    .state__action {
      margin-top: 16px;
    }

    .state__button {
      display: inline-block;
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: #fff;
      cursor: pointer;
      text-decoration: none;
      color: #222;
    }

    .state__button:hover {
      background: #f0f0f0;
    }

    .state__spinner {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-bottom: 12px;
      border: 3px solid #e0e0e0;
      border-top-color: #888;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .state--error {
      border-color: #f0c2c2;
    }

    .state--error .state__title {
      color: #b3261e;
    }
  </style>
</head>
<body>

  <!-- 1. Данных нет -->
  <div class="state">
    <p class="state__title">Данных нет</p>
    <p class="state__text">Здесь пока ничего не появилось.</p>
  </div>

  <!-- 2. Данных нет + предложение создать -->
  <div class="state">
    <p class="state__title">Данных нет</p>
    <p class="state__text">Здесь пока ничего не появилось. Самое время это исправить.</p>
    <div class="state__action">
      <a class="state__button" href="#">Создать</a>
    </div>
  </div>

  <!-- 3. Загрузка -->
  <div class="state">
    <div class="state__spinner"></div>
    <p class="state__title">Загрузка</p>
    <p class="state__text">Подождите, данные загружаются.</p>
  </div>

  <!-- 4. Ошибка -->
  <div class="state state--error">
    <p class="state__title">Ошибка</p>
    <p class="state__text">Во время загрузки что-то пошло не так.</p>
  </div>

</body>
</html>
```

### Что тут общего у всех четырёх блоков

Вся разметка — **одна и та же структура**:

```html
<div class="state">
  [иконка/спиннер — опционально]
  <p class="state__title">...</p>
  <p class="state__text">...</p>
  [действие — опционально]
</div>
```

Меняются только:
- текст заголовка и описания;
- наличие `.state__spinner`;
- наличие `.state__action`;
- модификатор `.state--error` (только у ошибки).

### Как из этого сделать компоненты

Один базовый компонент + сахар над ним:

```tsx
const State = ({ title, text, icon, action, variant }) => (
  <div className={`state${variant === 'error' ? ' state--error' : ''}`}>
    {icon}
    <p className="state__title">{title}</p>
    <p className="state__text">{text}</p>
    {action && <div className="state__action">{action}</div>}
  </div>
)

const EmptyState        = (props) => <State title="Данных нет" text="Здесь пока ничего не появилось." {...props} />
const EmptyCreateState  = (props) => <State title="Данных нет" text="...Самое время это исправить." action={<a className="state__button" href="#">Создать</a>} {...props} />
const LoadingState      = (props) => <State icon={<div className="state__spinner" />} title="Загрузка" text="Подождите, данные загружаются." {...props} />
const ErrorState        = (props) => <State variant="error" title="Ошибка" text="Во время загрузки что-то пошло не так." {...props} />
```





Это разъёб
https://react.dev/reference/react/ViewTransition
