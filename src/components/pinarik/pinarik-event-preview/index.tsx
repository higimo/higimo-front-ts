import { PinarikType } from "api-types/pinarik.types"
import { FunctionComponent } from "preact"

type PinarikEventPreviewPropsType = {
	id: PinarikType['id']
	// TODO: хорошо бы сюда один только скидывать
	pinarik: PinarikType[]
}

export const PinarikEventPreview: FunctionComponent<PinarikEventPreviewPropsType> = ({
	id,
	pinarik,
}) => {
	const data = pinarik.filter(i => i.id == id) || [{ description: 'data' }]

	return (
		<div className="pinarik-preview">
			{!data.length && (
				<div className="pinarik-preview__empty">
					Выбери что-то в пинарике внизу,<br />
					здесь появится описание дня
				</div>
			)}
			{data.map(item => {
				return (
					<div className="pinarik-preview__content">
						<div className="pinarik-preview__date">
							{(new Date(item.date)).toLocaleDateString()}
						</div>
						<div className="pinarik-preview__description">
							{item.description}
						</div>
					</div>
				)
			})}
		</div>
	)
}
