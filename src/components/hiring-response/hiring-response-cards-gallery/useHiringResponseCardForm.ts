import { PasteApiType } from 'api-types/paste.types'

import { useState, useCallback } from 'preact/hooks'

import { sendRequest } from 'utils/api/send-request'
import { smoothScroll } from 'utils/smooth-scroll'
import { todayStr } from 'utils/today-str'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { API_ROUTE } from 'dic/API_ROUTE'

const INIT_CARD: PasteApiType = {
	id: -1,
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
	handleUpdate: (newValue: Partial<PasteApiType>) => void
	handleSubmit: () => void
	handleReset: () => void
}
export const useHiringResponseCardForm = ({
	cards,
	fetchUpdate,
}: UseHiringResponseCardFormPropsType ): UseHiringResponseCardFormReturnType => {
	const [selectedCard, setSelectedCard] = useState<PasteApiType>(INIT_CARD)

	const handleSelect = useCallback((id: number) => () => {
		// @ts-ignore
		smoothScroll(ANCHOR_LINKS.hiringResponseForm)()
		const card = cards.find(card => card.id === id)
		if (card) {
			setSelectedCard(card)
		}
	}, [cards])

	const handleDelete = useCallback((id: number) => async () => {
		await sendRequest(API_ROUTE.pasteSingle({ id: id.toString() }), { method: 'DELETE' })
		await fetchUpdate()
	}, [fetchUpdate])

	const handleUpdate = useCallback((newValue: Partial<PasteApiType>) => {
		setSelectedCard(oldValue => ({ ...oldValue, ...newValue }))
	}, [setSelectedCard])

	const handleSubmit = useCallback(async () => {
		// TODO: см. PasteApiService
		const newContentCard: Omit<PasteApiType, 'id'> = {
			key: selectedCard.key,
			date: selectedCard.date,
			content: selectedCard.content,
		}
		const isUpdateMode = selectedCard.id > 0
		await sendRequest(
			(isUpdateMode ? API_ROUTE.pasteSingle({ id: selectedCard.id.toString() }) : API_ROUTE.paste),
			{
				method: (isUpdateMode ? 'PUT' : 'POST'),
				values: newContentCard
			}
		)
		await fetchUpdate()
	}, [selectedCard, fetchUpdate])

	const handleReset = useCallback(() => {
		setSelectedCard(INIT_CARD)
	}, [setSelectedCard])

	return {
		handleSelect,
		handleDelete,
		selectedCard,
		handleUpdate,
		handleSubmit,
		handleReset,
	}
}
