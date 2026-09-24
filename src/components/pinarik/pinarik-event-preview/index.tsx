import { PinarikType } from "api-types/pinarik.types"
import { FunctionComponent } from "preact"

type PinarikEventPreviewPropsType = {
	id: PinarikType['id']
	pinarik: PinarikType[]
}

export const PinarikEventPreview: FunctionComponent<PinarikEventPreviewPropsType> = ({
	id,
	pinarik,
}) => {
	const data = pinarik.filter(i => i.id == id) || { description: 'data' }

	return (
		<div className="test">
			{!data.length && (
				<div className="test">выбери что-нибудь</div>
			)}
			{data.map(item => {
				return (
					<div className="test">
						<div className="test">{(new Date(item.date)).toLocaleDateString()}</div>
						<div className="test">{item.description}</div>
					</div>
				)
			})}
		</div>
	)
}
