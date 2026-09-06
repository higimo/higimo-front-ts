import { FunctionComponent } from 'preact'
import { PasteApiType } from '../../types'
import { useCallback, useState } from 'preact/hooks'

import './style.css'
import { HiringResponseCardForm } from '../hiring-response-card-form'

const formatDate = (dateStr: string) => {
	const d = new Date(dateStr)
	return d.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

export const todayStr = () => new Date().toISOString().substring(0, 10)

const HiringResponseCardsEmpty: FunctionComponent = () => (
	<div className="empty-cards">
		Нет карточек. Добавьте первую!
	</div>
)

type HiringResponseCardPropsType = PasteApiType & {
	onEdit: () => void
	onDelete: () => void
}
const HiringResponseCard: FunctionComponent<HiringResponseCardPropsType> = ({
	id,
	key,
	content,
	date,
	onEdit,
	onDelete,
}) => (
	<div key={id} className="hiring-cards__item">
		<div className="hiring-cards__info">
			<div className="hiring-cards__id">
				# {id}
			</div>
			<div className="hiring-cards__date">
				{formatDate(date)}
			</div>
			<div className="hiring-cards__key">
				{key}
			</div>
		</div>
		<div
			className="hiring-cards__content"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
		<div className="hiring-cards__actions">
			<button className="btn-edit" onClick={onEdit}>
				✎ Редактировать
			</button>
			<button className="btn-delete" onClick={onDelete}>
				✕ Удалить
			</button>
		</div>
	</div>
)

type HiringResponseCardsGalleryPropsType = {
	cards: PasteApiType[]
	onCreateCard: () => void
}

export const HiringResponseCardsGallery: FunctionComponent<HiringResponseCardsGalleryPropsType> = ({
	cards,
	onCreateCard,
}) => {
	// TODO: редактирование карточки через форму на этой же странице
	const [selectedCard, setSelectedCard] = useState(null)

	// TODO: реализовать
	const handleSelectCard = useCallback(() => {
		console.log('handleSelectCard')
		// const card = cards.find(c => c.id === id)
		// if (!card) return
		// const newContentPrompt = prompt('Редактировать содержание:', card.content)
		// if (newContentPrompt === null) return
		// const trimmed = newContentPrompt.trim()
		// if (!trimmed) {
		// 	alert('Содержание не может быть пустым.')
		// 	return
		// }
		// const updated = cards.map(c =>
		// 	c.id === id ? { ...c, content: trimmed } : c
		// )
		// updateCards(updated)
	}, [])

	// TODO: реализовать
	const handleDeleteCard = useCallback(() => {
		console.log('handleDeleteCard')
		// if (!confirm('Удалить карточку?')) return
		// const filtered = cards.filter(c => c.id !== id)
		// updateCards(filtered)
	}, [])

	return (
		<div>
			<h2>Карточки откликов</h2>
			<div>
				<div className="hiring-cards">
					{cards.length === 0 ? (
						<HiringResponseCardsEmpty />
					) : (
						cards.map(card => (
							<HiringResponseCard
								{...card}
								onEdit={handleSelectCard}
								onDelete={handleDeleteCard}
							/>
						))
					)}
				</div>
				<HiringResponseCardForm
					selectedCard={selectedCard}
					onCreateCard={onCreateCard}
				/>
			</div>
		</div>
	)
}
