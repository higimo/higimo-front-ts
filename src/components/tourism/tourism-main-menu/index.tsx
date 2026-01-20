import { FunctionComponent } from 'preact';

import { HorizontalElement, HorizontalMenu } from 'components/ui/horizontal-menu';

import { tourismMenuLinks } from 'components/tourism/tourism-main-menu/tourismMenuLinks';

import './style.css'

export const TourismMainMenu: FunctionComponent = () => (
	<div className="tourism-main-menu">
		<HorizontalMenu>
			{tourismMenuLinks.map(tourismMenu => (
				<HorizontalElement>
					<a href={tourismMenu.href}>{tourismMenu.title}</a>
				</HorizontalElement>
			))}
		</HorizontalMenu>
	</div>
)