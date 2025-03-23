import { Component } from 'preact'
import { useState } from 'preact/hooks';

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
	const [ phrase, setPhrase ] = useState<string>('');
	const handerMouseenter = () => {
		setPhrase(getRandomPhrases())
	}
	return (
		<div className="magic-ball">
			<div className="shadow"></div>
			<div className="epos" onMouseEnter={handerMouseenter}>
				<div className="eball">
					<div className="illuminator">
						<div>
							<div className="triangle"></div>
							  <div className="textbox" dangerouslySetInnerHTML={{__html: phrase}} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
