import { useState } from 'preact/hooks'

import { getRandomPhrases } from 'utils/get-random-phrases'

import './style.css'

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
