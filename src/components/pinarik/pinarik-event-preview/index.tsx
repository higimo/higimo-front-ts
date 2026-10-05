import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'

import { isDefined } from 'utils/types/is-defined'

type PinarikEventPreviewPropsType = {
	pinarik?: PinarikType
}

export const PinarikEventPreview: FunctionComponent<PinarikEventPreviewPropsType> = ({
	pinarik,
}) => (
	<div className="pinarik-preview">
		{!isDefined(pinarik) && (
			<div className="pinarik-preview__empty">
				Выбери что-то в пинарике внизу,<br />
				здесь появится описание дня
			</div>
		)}
		{isDefined(pinarik) && (
			<div className="pinarik-preview__content">
				<div className="pinarik-preview__date">
					{(new Date(pinarik.date)).toLocaleDateString()}
				</div>
				<div className="pinarik-preview__description">
					{pinarik.description}
				</div>
			</div>
		)}
	</div>
)
