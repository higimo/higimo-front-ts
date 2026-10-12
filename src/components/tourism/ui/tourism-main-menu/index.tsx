import { FunctionComponent } from 'preact'

import { HorizontalElement, HorizontalMenu } from 'components/ui/horizontal-menu'

import { TOURISM_MENU_LINK } from 'data/tourism/tourism-menu-link'

import './style.css'

export const TourismMainMenu: FunctionComponent = () => (
	<div className="tourism-main-menu">
		<HorizontalMenu>
			{TOURISM_MENU_LINK.map(tourismMenu => (
				<HorizontalElement>
					<a href={tourismMenu.href as string}>{tourismMenu.title}</a>
				</HorizontalElement>
			))}
		</HorizontalMenu>
	</div>
)
