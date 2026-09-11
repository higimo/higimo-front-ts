forms.todo.txt

Современный подход к `react-hook-form` — это **декларативное описание полей** в виде массива или объекта, и **генерация формы** через `map`. Так вы избавляетесь от дублирования и держите код компактным.

Ниже пример с **конфигом полей**, валидацией через `zod` (или `yup`), и минимальным рендерингом. Используем встроенный `register` для нативных элементов и `Controller` для кастомных (например, Material-UI).

---

## 1. Конфиг полей (массив объектов)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Схема валидации
const schema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(6, 'Минимум 6 символов'),
	age: z.number().min(18, 'Вам должно быть 18+'),
});

type FormData = z.infer<typeof schema>;

// Конфиг полей: определяем рендеринг и атрибуты
const fieldsConfig = [
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'example@mail.ru',
	},
	{
		name: 'password',
		label: 'Пароль',
		type: 'password',
		placeholder: '******',
	},
	{
		name: 'age',
		label: 'Возраст',
		type: 'number',
		placeholder: '18',
	},
];
```

---

## 2. Компонент формы (максимально короткий)

```tsx
const MyForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{fieldsConfig.map(({ name, label, ...inputProps }) => (
				<div key={name}>
					<label htmlFor={name}>{label}</label>
					<input id={name} {...register(name as keyof FormData)} {...inputProps} />
					{errors[name as keyof FormData] && (
						<span style={{ color: 'red' }}>
							{errors[name as keyof FormData]?.message}
						</span>
					)}
				</div>
			))}
			<button type="submit">Отправить</button>
		</form>
	);
};
```

---

## 3. Если нужны кастомные компоненты (Material UI, Ant Design) – используем `Controller`

Конфиг дополняется полем `component`:

```tsx
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const fieldsConfig = [
	{
		name: 'email',
		label: 'Email',
		component: TextField, // можно передать компонент
		props: { variant: 'outlined', fullWidth: true },
	},
	// ...
];

// В рендере:
{fieldsConfig.map(({ name, component: Component, props, label }) => (
	<Controller
		key={name}
		name={name as keyof FormData}
		control={control}
		render={({ field, fieldState: { error } }) => (
			<Component
				{...field}
				{...props}
				label={label}
				error={!!error}
				helperText={error?.message}
			/>
		)}
	/>
))}
```

---

## 4. Ещё короче – через `useFormContext` и отдельный компонент поля

Вы можете вынести рендеринг поля в отдельный компонент, а конфиг передавать через контекст – тогда код станет ещё чище.

---

## 5. Использование `react-hook-form` + `zod` – это стандарт 2025

- **Zod** даёт строгую типизацию и декларативную валидацию.
- **`resolver`** автоматически связывает схему с формой.
- Вся логика валидации живёт в одном месте (схема), а не размазана по полям.

---

## 6. Что ещё можно улучшить

- Добавить `defaultValues` в `useForm` из конфига.
- Использовать `getValues` для зависимых полей.
- Сделать хук `useFormFields`, который принимает конфиг и возвращает элементы.

---

## Итог

Современный лаконичный `react-hook-form` выглядит так:

- **Конфиг** (массив объектов с полями)
- **Схема валидации** (Zod/Yup)
- **Один `map`** для рендеринга
- **Минимум дублирования** – весь код формы сводится к 10–20 строкам.

Этот подход масштабируется, легко читается и поддерживается.







Дополнение
В случае косяка показывать подпись снизу
Если бекенд что-то не то ответил — показывать тосты
