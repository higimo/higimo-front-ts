import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useCallback, useState } from 'preact/hooks'

import { CollapseSection } from 'components/ui/collapse-section/CollapseSection'
import { HiringResponseCard } from 'components/hiring-response/hiring-response-card'
import { HiringResponseCardForm } from 'components/hiring-response/hiring-response-card-form'
import { OnlyAdmin } from 'components/util/only-admin'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { pasteApi } from 'repositories/paste-api.repository'
import { smoothScroll } from 'utils/browser/smooth-scroll'
import { todayStr } from 'utils/date/today-str'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import './style.css'

type HiringResponseCardsGalleryPropsType = {
	cards: PasteApiType[]
	fetchUpdate: () => void
}

const INIT_CARD: PasteApiType = {
	// TODO: [MIDDLE] ну это не годится
	id: parseInt(DEFAULT_ID, 10),
	content: '',
	date: todayStr(),
	key: 'send-resume'
}



export const HiringResponseCardsGallery: FunctionComponent<HiringResponseCardsGalleryPropsType> = ({
	cards,
	fetchUpdate,
}) => {
	const [selectedCard, setSelectedCard] = useState<PasteApiType>(INIT_CARD)

	const handleSelect = useCallback((id: number) => () => {
		smoothScroll(ANCHOR_LINKS.hiringResponseForm)()
		const card = cards.find(card => card.id === id)
		if (card) {
			setSelectedCard(card)
		}
	}, [cards])

	const handleDelete = useCallback((id: number) => async () => {
		await pasteApi.delete(id)
		await fetchUpdate()
	}, [fetchUpdate])

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
