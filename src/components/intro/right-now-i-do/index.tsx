import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { OnlyAdmin } from '../../util/only-admin'
import { TextContainer } from '../../ui/text-container'

import './style.css'

export const RightNowIDo: FunctionComponent = () => {
	return (
		<PrecentationContainer className="right-now-i-do">
			<TextContainer>
				<div className="right-now-i-do__title">
					Прямо сейчас занимаюсь:
				</div>
				<div className="right-now-i-do__deal">
					Пишу техники в канал
				</div>
			</TextContainer>
			<OnlyAdmin>
				<div className="right-now-i-do__anons">
					Как это работает
				</div>
			</OnlyAdmin>
		</PrecentationContainer>
	)
}
