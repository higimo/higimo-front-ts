import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../../components/ui/text-container'
import { ComojiGalery } from '../../../../components/tool/comoji-galery'

export const ComojiPage: FunctionComponent = () => {
	document.title = 'Комоджи смайлы'

	return (
		<div className="tool-index-page">
			<TextContainer>
				<h1>Комоджи смайлы</h1>
				<p>
					Нажимаешь на смайл — копируется в буфер обмена
				</p>
			</TextContainer>
			<ComojiGalery />
		</div>
	)
}
