import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useToggle } from 'hook/use-toggle'

import { OnlyAdmin } from 'components/util/only-admin'

import { formatDate } from 'utils/date/format-date'

type HiringResponseCardPropsType = PasteApiType & {
	onEdit: () => void
	onDelete: () => void
}

// TODO: [LIGHT] Вынести в утилиты текста
const getBr = (str: string): string => str.replace(/\n/g, '<br />')
const getHr = (str: string): string => str.replace(/----/g, '<hr />')
const linkify = (str: string): string =>
	str.replace(/https?:\/\/[^\s<>"']+/g, (match) => {
	try {
		const url = new URL(match);
		const label = url.host + url.pathname; // без протокола и query
		return `<a href="${url.href}">${label}</a>`;
	} catch {
		return match; // если URL невалидный — оставляем как есть
	}
});

export const HiringResponseCard: FunctionComponent<HiringResponseCardPropsType> = ({
	id,
	key,
	content,
	date,
	onEdit,
	onDelete,
}) => {
	const [showFull, toggleShowFull] = useToggle(false)

	return (
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
				onClick={toggleShowFull}
				dangerouslySetInnerHTML={{ __html: linkify(getHr(getBr(content))) }}
				style={(showFull
					? { maxHeight: '100%' }
					: {}
				)}
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
}
