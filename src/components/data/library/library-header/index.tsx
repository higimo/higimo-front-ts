import { FunctionComponent } from 'preact'

import { OnlyAdmin } from 'components/util/only-admin'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const LibraryHeader: FunctionComponent = () => (
	<OnlyAdmin>
		<div className="library-header">
			<TextContainer>
				<div className="library-header__list">
					<a href={ROUTE_LINKS.libraryIndex}>Главная</a>
					<a href={ROUTE_LINKS.libraryForm}>Админка</a>
				</div>
			</TextContainer>
		</div>
	</OnlyAdmin>
)
