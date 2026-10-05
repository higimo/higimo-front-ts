import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useHiringResponseCardForm } from './useHiringResponseCardForm'

import { HiringResponseCard } from 'components/hiring-response/hiring-response-card'
import { HiringResponseCardForm } from 'components/hiring-response/hiring-response-card-form'
import { OnlyAdmin } from 'components/util/only-admin'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'
import { CollapseSection } from 'components/ui/collapse-section/CollapseSection'
import { TextContainer } from 'components/ui/text-container/TextContainer'

type HiringResponseCardsGalleryPropsType = {
	cards: PasteApiType[]
	fetchUpdate: () => void
}

export const HiringResponseCardsGallery: FunctionComponent<HiringResponseCardsGalleryPropsType> = ({
	cards,
	fetchUpdate,
}) => {
	const {
		selectedCard,
		handleSelect,
		handleDelete,
	} = useHiringResponseCardForm({
		cards,
		fetchUpdate,
	})

	return (
		<div>
			<div id={ANCHOR_LINKS.hiringResponseForm}>
				<OnlyAdmin>
					<TextContainer>
						<CollapseSection header="Форма">
							<HiringResponseCardForm
								initialData={selectedCard}
								fetchUpdate={fetchUpdate}
							/>
						</CollapseSection>
					</TextContainer>
				</OnlyAdmin>
			</div>
			<div className="hiring-cards" id={ANCHOR_LINKS.hiringResponseGallery}>
				{cards.map(card => (
					<HiringResponseCard
						{...card}
						key={card.id.toString()}
						onEdit={handleSelect(card.id)}
						onDelete={handleDelete(card.id)}
					/>
				))}
			</div>
		</div>
	)
}
