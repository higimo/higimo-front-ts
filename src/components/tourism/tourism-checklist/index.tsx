import { CheckboxWithLocalStorage } from 'components/form/checkbox-with-local-storage'
import { TextContainer } from 'components/ui/text-container';

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
]

const thingListData = [
	'пенки',
	'матрас',
	'полотенце',
	'туалетка',
	'мыло, зубная щетка, паста',
	'фонари',
	'спальник',
	'ватные салфетки',
	'шорты',
	'непромокаемая куртка',
	'непромокаемые штаны',
	'трекинговые ботинки',
	'футболка',
	'носки ×3',
	'вода или пустые бутылки',
	'ирп',
	'нож',
	'веревка не менее 5 метров',
	'походная посуда',
	'карта местности и движения по ней',
	'солнцезащитный крем (ожоги)',
	'средство от насекомых (клещи — опасно)',
	'бандана (солнечный удар)',
	'power bank',
	'телефон',
	'паспорт',
	'проходные билеты',
	'запасные деньги',
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
	<div className="container">
		<TextContainer>
			<div className="disclaimer">
				<p>
					Даже если перезагрузить страницу, отмеченные 
					пункты останутся — они запомнились внутри браузера. 
					Данные никуда не передавались, так что поотмечав на телефоне, 
					продолжить на компьютере уже не выйдет.
				</p>
			</div>
		</TextContainer>

		<TextContainer>
			<div className="description">
				<span
					className="pseudo-link"
					onClick={() => {
						document.querySelectorAll('.organisation-list__item input:checked')
							.forEach((el: HTMLInputElement) => el.click())
					}}
				>
					Сбросить все
				</span>
			</div>
		</TextContainer>

		<TextContainer>
			<h2>Организация</h2>
		</TextContainer>
		<ul className="organisation-list">
			{organizeListData.map(item => (
				<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
			))}
		</ul>

		<TextContainer>
			<h2>Еда</h2>
		</TextContainer>
		<ul className="organisation-list">
			{foodListData.map(item => (
				<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
			))}
		</ul>

		<TextContainer>
			<h2>Вещи</h2>
		</TextContainer>
		<ul className="organisation-list">
			{thingListData.map(item => (
				<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
			))}
		</ul>

		<TextContainer>
			<h2>Аптечка</h2>
		</TextContainer>
		<ul className="organisation-list">
			{farmListData.map(item => (
				<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
			))}
		</ul>

		<TextContainer>
			<h2>Фото аппарат</h2>
		</TextContainer>
		<ul className="organisation-list">
			{photoListData.map(item => (
				<li className="organisation-list__item">{CheckboxWithLocalStorage({ text: item })}</li>
			))}
		</ul>
	</div>
)
