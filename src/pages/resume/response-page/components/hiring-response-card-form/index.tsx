import { FunctionComponent } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { todayStr } from '../hiring-response-cards-gallery'

import './style.css'
import { PasteApiType } from '../../types'

type HiringResponseCardFormPropsType = {
	selectedCard: PasteApiType | null
	onCreateCard: () => void
}
export const HiringResponseCardForm: FunctionComponent<HiringResponseCardFormPropsType> = ({
	onCreateCard,
}) => {
	const [newDate, setNewDate] = useState(todayStr)
	const [newContent, setNewContent] = useState('')

	// @ts-ignore
	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		// TODO: реализовать форму
		console.log('HiringResponseCardForm')
		// const content = newContent.trim()
		// if (!content) {
		// 	alert('Пожалуйста, введите содержание карточки.')
		// 	return
		// }
		// const newCard = {
		// 	id: generateId(),
		// 	date: newDate || todayStr(),
		// 	content: content,
		// }
		// updateCards([...cards, newCard])
		// setNewContent('')
		// setNewDate(todayStr())
	}, [])

	return (
		<form className="add-card-row" onSubmit={handleSubmit}>
			<input
				type="date"
				value={newDate}
				// @ts-ignore
				onChange={event => setNewDate(event.target.value)}
				aria-label="Дата"
			/>
			<textarea
				placeholder="Содержание карточки…"
				value={newContent}
				// @ts-ignore
				onChange={event => setNewContent(event.target.value)}
				rows={1}
				aria-label="Содержание"
			/>
			<button type="submit" className="btn-add-submit">
				＋ Добавить карточку
			</button>
		</form>
	)
}
