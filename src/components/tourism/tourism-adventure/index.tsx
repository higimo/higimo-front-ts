import { FunctionComponent } from 'preact'
import { AdventureType } from './ADVENTURES'

import './style.css'

type TourismAdventurePropsType = {
	adventure: AdventureType
}
export const TourismAdventure: FunctionComponent<TourismAdventurePropsType> = ({
	adventure,
}) => (
	<a className="tourism-adventure" href={adventure?.href}>
		<div className="tourism-adventure__options">
			{adventure?.options.map(option => (
				<div className="tourism-adventure__option-item">
					<div className="tourism-adventure-option__title">
						{option.title}
					</div>
					<div className="tourism-adventure-option__value">
						{option.value}
					</div>
				</div>
			))}
		</div>
		<div className="tourism-adventure__title">
			{adventure?.title}
		</div>
		<div className="tourism-adventure__description">
			{adventure?.description}
		</div>
		<div className="tourism-adventure__tear-off-stub tear-off-stub">
			<div className="tear-off-stub__meta">
				<div className="tear-off-stub__memory">
					Электронный билет
				</div>
				<div className="tear-off-stub__id">
					№ {adventure?.id}
				</div>
			</div>
			<div className="tear-off-stub__title">
				{adventure?.title}
			</div>
			<div className="tear-off-stub__advent">
				{adventure?.advent}
			</div>
		</div>
	</a>
)
