import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useHiringResponseCardForm } from './useHiringResponseCardForm'

import { HiringResponseCard } from 'components/hiring-response/hiring-response-card'
import { HiringResponseCardForm } from 'components/hiring-response/hiring-response-card-form'
import { HiringResponseCardsEmpty } from 'components/hiring-response/hiring-response-cards-empty'
import { OnlyAdmin } from 'components/util/only-admin'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'

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
		handleUpdate,
		handleSubmit,
		handleReset,
		handleSelect,
		handleDelete,
	} = useHiringResponseCardForm({
		cards,
		fetchUpdate,
	})

	return (
		<div>
			<div className="hiring-cards">
				{cards.length === 0 ? (
					<HiringResponseCardsEmpty />
				) : (
					cards.map(card => (
						<HiringResponseCard
							{...card}
							onEdit={handleSelect(card.id)}
							onDelete={handleDelete(card.id)}
						/>
					))
				)}
			</div>
			<div id={ANCHOR_LINKS.hiringResponseForm}>
				<OnlyAdmin>
					<HiringResponseCardForm
						selectedCard={selectedCard}
						onUpdate={handleUpdate}
						onSubmitCard={handleSubmit}
						onReset={handleReset}
					/>
				</OnlyAdmin>
			</div>
		</div>
	)
}
