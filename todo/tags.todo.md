# API тегов с категориями

## Контракты API

Сервер отдаёт плоский список тегов, каждый тащит свою категорию (или `null`).

```json
{
	"data": {
		"id": 42,
		"name": "Иван",
		"tags": [
			{ "id": 1, "name": "Москва", "category": { "id": 10, "slug": "cities", "name": "Города" } },
			{ "id": 2, "name": "Питер", "category": { "id": 10, "slug": "cities", "name": "Города" } },
			{ "id": 5, "name": "Друг", "category": { "id": 20, "slug": "relations", "name": "Отношения" } },
			{ "id": 9, "name": "VIP", "category": null }
		]
	}
}
```

- + Один массив, прямая связь «тег → его категория», тривиальная группировка (Map по `category.id`).
- + Легко фильтровать/сортировать теги независимо от категорий.
- − Дублирование полей `category` на каждый тег. На маленьких объёмах (< 100) неважно.

## Типы

`api-types/tag.types.ts`
```ts
export type TagCategory = {
	id: number
	slug: string
	name: string
}

export type Tag = {
	id: number
	name: string
	category: TagCategory | null
}
```

`api-types/entity.types.ts` (сущность с тегами)
```ts
import type { Tag } from 'api-types/tag.types'

export type Entity = {
	id: number
	name: string
	tags: Tag[]
}
```

## Группировка на клиенте

`utils/group-tags-by-category.ts`
```ts
import type { Tag, TagCategory } from 'api-types/tag.types'

export type TagGroup = {
	category: TagCategory | null
	tags: Tag[]
}

/**
 * Группирует теги по категориям. Сохраняет порядок первого появления.
 * Теги без категории попадают в группу с `category: null`.
 */
export const groupTagsByCategory = (tags: Tag[]): TagGroup[] => {
	const map = new Map<number | null, TagGroup>()

	for (const tag of tags) {
		const key = tag.category?.id ?? null
		const group = map.get(key)

		if (group) {
			group.tags.push(tag)
		} else {
			map.set(key, { category: tag.category, tags: [tag] })
		}
	}

	return [...map.values()]
}
```

## Компонент Tag

`components/tag/index.tsx`
```tsx
import type { Tag as TagModel } from 'api-types/tag.types'

type Props = {
	tag: TagModel
}

export const Tag = ({ tag }: Props) => (
	<div class="tag" data-tag-id={tag.id} data-category-slug={tag.category?.slug}>
		{tag.name}
	</div>
)
```

CSS — `components/tag/styles.css` (импортируется где подключается компонент)
```css
.tag {
	display: inline-flex;
	align-items: center;
	padding: 2px 8px;
	border-radius: 4px;
	background: #eee;
	font-size: 14px;
}
```

## Компонент TagCategory

`components/tag-category/index.tsx`
```tsx
import { Tag } from 'components/tag'
import type { TagCategory as TagCategoryModel, Tag as TagModel } from 'api-types/tag.types'

type Props = {
	category: TagCategoryModel | null
	tags: TagModel[]
	/**
	 * Показывать заголовок категории.
	 * Ставьте `false`, когда категория единственная и её имя избыточно.
	 */
	showTitle?: boolean
}

export const TagCategory = ({ category, tags, showTitle = true }: Props) => {
	const isUntitled = category === null

	return (
		<div class="tag-category" data-category-id={category?.id ?? ''}>
			{showTitle && !isUntitled && (
				<div class="tag-category__title">{category.name}</div>
			)}
			<div class="tag-category__list">
				{tags.map((tag) => (
					<Tag key={tag.id} tag={tag} />
				))}
			</div>
		</div>
	)
}
```

Важно: `showTitle` игнорируется для `category === null` — у «без категории» нет заголовка в принципе.

CSS — `components/tag-category/styles.css`
```css
.tag-category {
	margin-bottom: 8px;
}

.tag-category__title {
	font-size: 12px;
	text-transform: uppercase;
	color: #666;
	margin-bottom: 4px;
}

.tag-category__list {
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
}
```

## EntityTags. Показывать одну категорию

```tsx
import { useMemo } from 'preact/hooks'
import { TagCategory } from 'components/tag-category'
import { groupTagsByCategory } from 'utils/group-tags-by-category'
import type { Tag } from 'api-types/tag.types'

type Props = {
	tags: Tag[]
}

export const EntityTags = ({ tags }: Props) => {
	const groups = useMemo(() => groupTagsByCategory(tags), [tags])

	if (!groups.length) {
		return null
	}

	return (
		<div class="entity-tags">
			{groups.map((group) => (
				<TagCategory
					key={group.category?.id ?? 'none'}
					category={group.category}
					tags={group.tags}
					showTitle={true}
				/>
			))}
		</div>
	)
}
```

## EntityTags. Скрывать единственную категорию

```tsx
import { useMemo } from 'preact/hooks'
import { TagCategory } from 'components/tag-category'
import { groupTagsByCategory } from 'utils/group-tags-by-category'
import type { Tag } from 'api-types/tag.types'

type Props = {
	tags: Tag[]
}

export const EntityTags = ({ tags }: Props) => {
	const groups = useMemo(() => groupTagsByCategory(tags), [tags])

	if (!groups.length) {
		return null
	}

	// Игнорируем группу «без категории» — её всё равно не показываем с заголовком
	const categorizedCount = groups.reduce(
		(acc, group) => (group.category ? acc + 1 : acc),
		0
	)
	const showTitle = categorizedCount > 1

	return (
		<div class="entity-tags">
			{groups.map((group) => (
				<TagCategory
					key={group.category?.id ?? 'none'}
					category={group.category}
					tags={group.tags}
					showTitle={showTitle}
				/>
			))}
		</div>
	)
}
```

## Что важно понимать

- Логику «показывать/скрывать» **не надо** тащить в `TagCategory` через отдельный пропс `hideSingle` — это протёкшая бизнес-логика уровня «всего экрана» в компонент, который знает только про свою категорию. `showTitle` уже даёт нужный уровень управления.
- Если захотите **никогда** не показывать title для категории с флагом «служебная» (например, `slug === 'default'`), добавьте это отдельным условием в `TagCategory` — и оно будет работать в обоих вариантах, не дублируясь.
- «Скрыть единственную» — почти всегда лучший UX: одна категория с заголовком выглядит как визуальный шум. Стоимость — мизерная, поэтому рекомендую **Вариант 2**.

## Ловушки, которые стоит проверить

1. **Все теги без категории** (`categorizedCount === 0`) — в обоих вариантах рендерится одна группа `category: null`, заголовка нет. Поведение одинаковое, специального `if` не нужно.
2. **Порядок категорий**. Сейчас — порядок первого появления тега. Если нужен фиксированный (например, по `category.id` или серверный `order`) — добавьте поле `category.order` в контракт и сортируйте группы перед рендером. Стоимость — один `.sort()` в `groupTagsByCategory`.
3. **Пустые теги** (`tags: []`) — `groups.length === 0`, ничего не рендерим (проверка в `EntityTags` уже есть).
4. **Смена состава при ре-рендере**. `useMemo` по ссылке `tags` — если родитель каждый раз создаёт новый массив, мемоизация не сработает. Либо стабилизируйте ссылку, либо уберите `useMemo` (для десятков тегов разница мизерная).
