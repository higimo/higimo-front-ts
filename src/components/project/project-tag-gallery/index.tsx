import { FunctionComponent } from 'preact'
import { ProjectFullInfoType } from 'types'
import { filterType } from 'components/project/project-tag-gallery/filter-type'

import { useMemo } from 'preact/hooks'

import { ProjectTag } from 'components/project/project-tag'
import { TextContainer } from 'components/ui/text-container';

const TAG_CATEGORY_MAP = {
	'Размер': [
		'грандиозный', 'большой', 'нормальный',
		// 'малый',
	],
	'Роль': [
		'менеджмент', 'дизайнер', 'разработчик', 'верстальщик', 'автор', 'музыкант', 
	],
	'Агентство': [
		'Студия Лебедева', 'Эртоп', 'хомяк', 'Рамблер', 'SuperJob', 'Пересечения',
	],
	// 'Город': [
	//	 'Москва', 'Нижний Новгород', 'Интернет',
	// ],
	'Тип проекта': [
		'концепт', 'сайт', 'подпись электропочты', 'консультация', 'дизайн', 'документация',
		'паблик', 'сервис', 'раздел', 'гаджет', 'бот', 'автоматизация', 'опенсорс',
		// 'микросервис',
		'скрипт', 'выступление', 'итоги года', 'мероприятие', 'поддержка',
		'продукт', 'бизнес-процесс', 'подкаст', 'квалификация', 'исследование', 'проектирование',
	],
	// 'Технология': [
	//	 'Битрикс', 'имприматур', 'электропочта', 'фронтенд', 'Реакт', 'бекенд', 'фуллстек',
	//	 'физическое устройство', 'Вайзер', 'Вордпресс', 'Телеграм', 'Википедия', 'ВК', 
	// ],
	'Продукт': [
		// 'A/B-тест',
		// 'бизнес-модель',
		'осознанность',
		// 'перфоманс',
		// 'синхронизация',
		'сценарий',
		// 'фрод',
		'оптимизация',
		// 'интерфейс — зло',
		'конверсия',
		// 'качество резюме',
	]
} as const


type MappedCategory = {
	title: string;
	tags: ProjectFullInfoType['tags'];
}

const ProjectTagCategory: FunctionComponent<{ tags: ProjectFullInfoType['tags'] }> = (props) => {
	// TODO как сделать категорию тегов ДРУГОЕ?
	const mappedTags: MappedCategory[] = useMemo(() => {
		const tagCategories = Object.keys(TAG_CATEGORY_MAP)

		let tmpMappedTags = {}
		for (const tag of props.tags) {
			for (const tagCategory of tagCategories) {
				if (TAG_CATEGORY_MAP[tagCategory].includes(tag)) {
					if (!tmpMappedTags[tagCategory]) {
						tmpMappedTags[tagCategory] = {
							title: tagCategory,
							tags: [],
						}
					}
					tmpMappedTags[tagCategory].tags.push(tag)
				}
			}
		}

		return Object.values(tmpMappedTags)
	}, [props.tags])
	
	return mappedTags.map(mappedCategory => (
		<div className="project-tag__category-group">
			<div className="project-tag__list">
				<div className="project-tag__category-name">{mappedCategory.title}</div>
				{mappedCategory.tags.map(tagName => (
					<ProjectTag filterName={filterType.FILTER_TAG}>{tagName}</ProjectTag>
				))}
			</div>
		</div>
	))
}

type ProjectTagGalleryPropsType = {
	tags: ProjectFullInfoType['tags'],
}
export const ProjectTagGallery: FunctionComponent<ProjectTagGalleryPropsType> = ({ tags }) => {
	return (
		<TextContainer className="project-tag">
			<ProjectTagCategory tags={tags} />
		</TextContainer>
	)
}

