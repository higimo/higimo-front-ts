import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { OnlyAdmin } from 'components/util/only-admin'

import { formatDate } from 'utils/formatter/format-date'

type HiringResponseCardPropsType = PasteApiType & {
	onEdit: () => void
	onDelete: () => void
}

export const HiringResponseCard: FunctionComponent<HiringResponseCardPropsType> = ({
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
		<OnlyAdmin>
			<div className="hiring-cards__actions">
				<button className="btn-edit" onClick={onEdit}>
					✎ Редактировать
				</button>
				<button className="btn-delete" onClick={onDelete}>
					✕ Удалить
				</button>
			</div>
		</OnlyAdmin>
	</div>
)
