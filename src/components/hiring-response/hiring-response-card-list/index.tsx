import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useCallback, useState } from 'preact/hooks'

import { CollapseSection } from 'components/ui/collapse-section/CollapseSection'
import { HiringResponseCard } from 'components/hiring-response/hiring-response-card'
import { HiringResponseCardForm } from 'components/hiring-response/hiring-response-card-form'
import { OnlyAdmin } from 'components/util/only-admin'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { parseBrandId } from 'utils/types/parse-brand-id'
import { pasteApi } from 'repositories/paste-api.repository'
import { smoothScroll } from 'utils/browser/smooth-scroll'
import { todayStr } from 'utils/date/today-str'

import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import './style.css'

const INIT_CARD: PasteApiType = {
	id: parseBrandId<PasteApiType['id']>(DEFAULT_ID),
	content: '',
	date: todayStr(),
	key: 'send-resume'
}

type HiringResponseCardListPropsType = {
	cards: PasteApiType[] | null
	fetchUpdate: () => void
}

export const HiringResponseCardList: FunctionComponent<HiringResponseCardListPropsType> = ({
	cards,
	fetchUpdate,
}) => {
	if (!cards) {
		return null
	}
	const [selectedCard, setSelectedCard] = useState<PasteApiType>(INIT_CARD)

	const handleSelect = useCallback((id: PasteApiType['id']) => () => {
		smoothScroll(ANCHOR_LINK.hiringResponseForm)()
		const card = cards.find(card => card.id === id)
		if (card) {
			setSelectedCard(card)
		}
	}, [cards])

	const handleDelete = useCallback((id: PasteApiType['id']) => async () => {
		await pasteApi.delete(id)
		await fetchUpdate()
	}, [fetchUpdate])

	return (
		<div>
			<div id={ANCHOR_LINK.hiringResponseForm}>
				<OnlyAdmin>
					<TextContainer>
						<CollapseSection title="Форма" fold={false}>
							<HiringResponseCardForm
								key={selectedCard.id}
								initialData={selectedCard}
								fetchUpdate={fetchUpdate}
							/>
						</CollapseSection>
					</TextContainer>
				</OnlyAdmin>
			</div>
			<div className="hiring-cards" id={ANCHOR_LINK.hiringResponseGallery}>
				{cards.slice(0, 36).map(card => (
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
