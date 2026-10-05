import { PasteApiType } from 'api-types/paste.types'

import { useState, useCallback } from 'preact/hooks'

import { pasteApi } from 'repositories/paste-api.repository'
import { smoothScroll } from 'utils/browser/smooth-scroll'
import { todayStr } from 'utils/date/today-str'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

const INIT_CARD: PasteApiType = {
	// TODO: [MIDDLE] ну это не годится
	id: parseInt(DEFAULT_ID, 10),
	content: '',
	date: todayStr(),
	key: 'send-resume'
}

type UseHiringResponseCardFormPropsType = {
	cards: PasteApiType[]
	fetchUpdate: () => void
}
type UseHiringResponseCardFormReturnType = {
	handleSelect: (id: number) => () => void
	handleDelete: (id: number) => () => void
	selectedCard: PasteApiType
}

// TODO: [MIDDLE] надо написать хук, который выбирает разные элементы
// и передаёт состояние выбранности, здесь и для пинарика
export const useHiringResponseCardForm = ({
	cards,
	fetchUpdate,
}: UseHiringResponseCardFormPropsType ): UseHiringResponseCardFormReturnType => {
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

	return {
		handleSelect,
		handleDelete,
		selectedCard,
	}
}
