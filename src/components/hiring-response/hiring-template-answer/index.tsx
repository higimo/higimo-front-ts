import { CollapseSection } from "components/ui/collapse-section/CollapseSection";
import { FunctionComponent } from "preact";
import { copyToClipboard } from "utils/browser/copy-to-clipboard";

import './style.css'

const RESONSE = '\
Здравствуйте!\n\
\n\
{text}\n\
\n\
Буду рад пообщаться https://t.me/higimo и вот доступные окошки \
для встречи https://calendar.app.google/PXuF1dG7Ub8vhHXy5'

const MONEY = '\
О вилке я бы предпочёл говорить, когда буду детальнее понимать \
область ответственности. Давайте пока отталкиваться от в 200 000 ₽, \
по результатам переговоров подвинемся в ту или иную сторону'

const FRIEND = '\
Здравстуйте, я сейас в активном поиске работы фронтендером на React. \
Если вдруг буду полезен, вот резюме https://higimo.ru/utkin-frontend.pdf'

type HiringTemplateAnswerPropsType = {
}

export const HiringTemplateAnswer: FunctionComponent<HiringTemplateAnswerPropsType> = ({
}) => (
	<CollapseSection header="Шаблоны сообщений">
		<div className="hiring-template-answer">
			<div className="hiring-template-answer__column">
				<h2>Текст отклика</h2>
				<span
					className="pseudo-link"
					onClick={() => copyToClipboard(RESONSE)}
				>
					Скопировать
				</span>
				<p>
					{RESONSE}
				</p>
			</div>
			<div className="hiring-template-answer__column">
				<h2>Про деньги</h2>
				<span
					className="pseudo-link"
					onClick={() => copyToClipboard(MONEY)}
				>
					Скопировать
				</span>
				<p>
					{MONEY}
				</p>
			</div>
			<div className="hiring-template-answer__column">
				<h2>Добавились в друзья</h2>
				<span
					className="pseudo-link"
					onClick={() => copyToClipboard(FRIEND)}
				>
					Скопировать
				</span>
				<p>
					{FRIEND}
				</p>
			</div>
		</div>
	</CollapseSection>
)
