import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useCallback } from 'preact/hooks'

import './style.css'

type HiringResponseCardFormPropsType = {
	selectedCard: PasteApiType
	onUpdate: (newValue: Partial<PasteApiType>) => void
	onSubmitCard: () => void
	onReset: () => void
}
export const HiringResponseCardForm: FunctionComponent<HiringResponseCardFormPropsType> = ({
	selectedCard,
	onUpdate,
	onSubmitCard,
	onReset,
}) => (
	<form className="hiring-response-card-form" onSubmit={(event) => event.preventDefault()}>
		<input type="id" value={selectedCard.id} readOnly={true} />
		<input type="key" value={selectedCard.key} readOnly={true} />
		<input
			type="date"
			value={selectedCard.date}
			onChange={event => onUpdate({ date: event.target.value })}
			aria-label="Дата"
		/>
		<textarea
			placeholder="Содержание карточки…"
			value={selectedCard.content}
			onChange={event => onUpdate({ content: event.target.value})}
			rows={10}
			aria-label="Содержание"
		/>
		<button type="submit" className="hiring-response-card-form__submit" onClick={onSubmitCard}>
			＋ Добавить карточку
		</button>
		<button className="btn-reset" onClick={onReset}>
			Сбросить
		</button>
	</form>
)
