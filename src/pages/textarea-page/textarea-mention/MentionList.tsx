import cs from 'classnames';
import { FunctionComponent, createRef } from 'preact';
import { useEffect } from 'preact/hooks';
import { MentionSuggest } from './types';

type MentionListPropsType = {
	onSelect: (value: MentionSuggest) => void;
	suggestList: MentionSuggest[];
	selectedSuggest: number;
};
export const MentionList: FunctionComponent<MentionListPropsType> = (props) => {
	const listRef = createRef();
	const handleClick = (value) => () => {
		props.onSelect(value);
	};
	useEffect(() => {
		const container = listRef.current;
		if (!container || props.selectedSuggest === -1) return;

		const activeItem = container.querySelector('.suggestion-list__item--active') as HTMLElement;
		if (!activeItem) return;

		// Получаем все необходимые размеры и позиции
		const containerHeight = container.clientHeight;
		const containerScrollTop = container.scrollTop;
		const itemOffsetTop = activeItem.offsetTop;
		const itemHeight = activeItem.offsetHeight;

		// Вычисляем видимую область
		const itemTop = itemOffsetTop - containerScrollTop;
		const itemBottom = itemTop + itemHeight;

		// Определяем, нужно ли скроллить и в каком направлении
		if (itemTop < 0) {
			// Элемент выше видимой области - скроллим вверх
			container.scrollTo({
				top: itemOffsetTop - 4, // Небольшой отступ 4px сверху
				behavior: 'smooth'
			});
		} else if (itemBottom > containerHeight) {
			// Элемент ниже видимой области - скроллим вниз
			container.scrollTo({
				top: itemOffsetTop - containerHeight + itemHeight + 4, // Отступ 4px снизу
				behavior: 'smooth'
			});
		}
	}, [props.selectedSuggest]);
	return (
		<div className="suggestion-list" ref={listRef}>
			{props.suggestList.map((item, index) => (
				<div
					onClick={handleClick(item)}
					className={cs('suggestion-list__item', {
						'suggestion-list__item--active': index === props.selectedSuggest
					})}
				>{item.display}</div>
			))}
		</div>
	);
};
