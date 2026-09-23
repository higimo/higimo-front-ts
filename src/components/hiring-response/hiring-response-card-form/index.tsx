import { DateOnlyString } from 'utils.type'
import { FunctionComponent, TargetedEvent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

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
			onChange={(event: TargetedEvent<HTMLInputElement>) => onUpdate({ date: event.currentTarget.value as DateOnlyString })}
			aria-label="Дата"
		/>
		<textarea
			placeholder="Содержание карточки…"
			value={selectedCard.content}
			onChange={event => onUpdate({ content: event.currentTarget.value})}
			rows={10}
			aria-label="Содержание"
		/>
		<button type="submit" className="hiring-response-card-form__submit" onClick={onSubmitCard}>
			Сохранить
		</button>
		<button className="btn-reset" onClick={onReset}>
			Сбросить
		</button>
	</form>
)
