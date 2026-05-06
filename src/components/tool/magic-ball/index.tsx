import { useState } from 'preact/hooks'

import './style.css'

var phrases = [
	'Бес&shy;спорно',
	'Пред&shy;решено',
	'Никаких сомнений',
	'Опреде&shy;лённо да',
	'Можешь быть уверен в этом',
	'Мне кажется: «да»',
	'Веро&shy;ятнее всего',
	'Хорошие перспек&shy;тивы',
	'Знаки говорят: «да»',
	'Да',
	'Пока не ясно, попробуй снова',
	'Спроси позже',
	'Лучше не рас&shy;сказы&shy;вать',
	'Сейчас нельзя предска&shy;зать',
	'Сконцентри&shy;руйся и спроси опять',
	'Даже не думай',
	'Мой ответ: «нет»',
	'По моим данным: «нет»',
	'Перспек&shy;тивы не очень хорошие',
	'Весьма сомни&shy;тельно',
] as const

const getRandomPhrases = () => phrases[Math.floor(Math.random() * phrases.length)]

export const MagicBall = () => {
	const [ phrase, setPhrase ] = useState<string>('')
	const handerMouseenter = () => {
		setPhrase(getRandomPhrases())
	}
	return (
		<div className="magic-ball">
			<div className="magic-ball__shadow" />
			<div className="magic-ball__epos" onMouseEnter={handerMouseenter}>
				<div className="magic-ball__eball">
					<div className="magic-ball__illuminator">
						<div>
							<div className="magic-ball__triangle"></div>
							  <div className="magic-ball__textbox" dangerouslySetInnerHTML={{__html: phrase}} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
