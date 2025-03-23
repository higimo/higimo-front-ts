import { HorizontalMenu, HorizontalElement } from '../../ui/horizontal-menu';

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS';

export const NokiaMenu = () => (
	<div className="nokia__menu">
		<HorizontalMenu>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaIndex} className="menu__item">
					Встречи
				</a>
			</HorizontalElement>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaPeople} className="menu__item">
					Люди
				</a>
			</HorizontalElement>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaMessage} className="menu__item">
					Переписки
				</a>
			</HorizontalElement>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaForm} className="menu__item">
					Добавить встречу
				</a>
			</HorizontalElement>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaPeopleForm} className="menu__item">
					+ person
				</a>
			</HorizontalElement>
			<HorizontalElement>
				<a href={ROUTE_LINKS.nokiaStatistic} className="menu__item">
					Статистика
				</a>
			</HorizontalElement>
		</HorizontalMenu>
	</div>
)
