import { Fragment } from 'preact/jsx-runtime'

import { CheckboxWithLocalStorage } from 'components/form/checkbox-with-local-storage'
import { Heading } from 'components/ui/heading'
import { TextContainer } from 'components/ui/text-container'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import './style.css'

// TODO: [BACKEND] переписать на бекенд списка списков
const organizeListData = [
	'все зарядить',
	'проверить снярягу',
	'проверить батарейки',
	'проверить память устройств',
	'проверить палатку',
]

const foodListData = [
	'колбаса солями',
	'сыр плавленный',
	'лаваш',
	'печенье',
	'ирп',
]

const thingListData = [
	'power bank',
	'телефон',
	'паспорт',
	'проходные билеты',
	'запасные деньги',
	'футболка',
	'носки ×3',
	'мыло, зубная щетка, паста',
	'карта местности и движения по ней',
]

const tourismThingListData = [
	'пенки',
	'полотенце',
	'туалетка',
	'фонарь',
	'спальник',
	'влажные салфетки',
	'шорты',
	'непромокаемая куртка',
	'непромокаемые штаны',
	'трекинговые ботинки',
	'вода или пустые бутылки',
	'нож',
	'веревка от 5 метров',
	'походная посуда',
	'солнцезащитный крем (ожоги)',
	'средство от насекомых (клещи — опасно)',
	'бандана (солнечный удар)',
]

const farmListData = [
	'активированный',
	'цитромон',
	'смекта',
	'пластырь',
]

const photoListData = [
	'зарядка'
]

export const TourismChecklist = () => (
	<Fragment>
		<TextContainer>
			<TourismSecondary main>
				<span
					className="pseudo-link"
					onClick={() => {
						document.querySelectorAll<HTMLInputElement>('.organisation-list__item input:checked')
							.forEach(el => el.click())
					}}
				>
					Сбросить все
				</span>
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Организация</Heading>
			<ul className="organisation-list">
				{organizeListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Еда</Heading>
			<ul className="organisation-list">
				{foodListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Фотоаппарат</Heading>
			<ul className="organisation-list">
				{photoListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Обязательные вещи</Heading>
			<ul className="organisation-list">
				{thingListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Походные вещи</Heading>
			<ul className="organisation-list">
				{tourismThingListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Аптечка</Heading>
			<ul className="organisation-list">
				{farmListData.map(item => (
					<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
				))}
			</ul>
		</TextContainer>
	</Fragment>
)
