import { FunctionComponent } from "preact"

import { useProject } from "../../../hook/use-project";

import { ProjectList } from "../../../components/project/project-list"
import { TextContainer } from "../../../components/ui/text-container"
import { ProjectTagGallery } from "../../../components/project/project-tag-gallery";

// https://higimo.ru/vk/
// https://github.com/higimo/vk-photos-react/blob/master/src/scss/index.scss
// https://github.com/higimo/analytics
// https://github.com/higimo/list-new/blob/master/src/routes/list-list-add/index.js
// https://github.com/higimo/museum


// ### В ролях
// 1 Дима Уткин — руководитель продукта соискателей
// 182 Артём Сорокин — лид бекенда соискателей
// 185 Влад Алексеев — лид команды поиска
// 186 Андрей Дербенев — глава бекенда
// 187 Евгений Касьяненко — глава фронтенда
// 188 Серафима Павлова — лид фронтенда соискателей
// 189 Арсен Афаунов — фронтендер
// 190 Алексей Захаров — президент
// 191 Владимир — бекендер
// 192 Елена Никифорова — овнер соискателей
// 28 Наташа Эллин — руководитель продукта работодателей
// 32 Станислав Мавлютов — фронтендер
// 34 Иван Спиридонов — фронтендер
// 36 Влад Солодов — дизайнер
// 193 Ян Подвойский —
// 194 Сергей Слепнёв —
// 195 Евгений Кречко —

// TODO link #2196f3


export const ProjectIndexPage: FunctionComponent = () => {
	const { projectsList, uniqTags } = useProject();

    return (
		<div>
            <TextContainer>
                <h1>Сделал</h1>
            </TextContainer>
			<ProjectTagGallery tags={uniqTags} />
            <ProjectList projectsList={projectsList} />
        </div>
    )
}