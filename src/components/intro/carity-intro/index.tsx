import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

export const CharityIntro: FunctionComponent = () => (
	<PrecentationContainer>
		<TextContainer>
			<div className="charity-intro">
				Больше всего на свете, я уважаю и обожаю гуманистические проекты. Если вы хотите поддержать эти удивительные проекты и сделать мир лучше, вот они:
				<ul>
					<li>
						<a href="https://archive.org/donate?origin=iawww-TopNavDonateButton">
							Internet Archive
						</a> — он же Wayback Machine, роботы, которые сохраняют страницы интернета. Это культурные артефакты, которых больше нигде в мире нет. Мем, что попавшее в интернет остаётся там навсегда, никогда не работал. Например, здесь хранятся флеш-игры, сам файкт их хранения — маленькое чудо.
					</li>
					<li>
						<a href="https://wikimediafoundation.org/give/">Wikipedia</a> — всемирная и самая большая в мире энциклопедия. Я потратил на неё несколько лет своей жизни, развил несколько русскоязычных разделов, чтобы эта часть культуры просто осталась, а не растворилась. Быть причастным — невероятно приятное чувство.
					</li>
					<li>
						<a href="https://my.fsf.org/donate">Ричард Столлман</a> — создатель идеи свободного программного обеспечения. На его идеях основано всё то, почему сейчас работает не только Google, Яндекс и Tencent, где, как известно, разрабатывают всё своё, включая языки программирования. Его огромная заслуга в свободности современного мира.
					</li>
				</ul>
			</div>
		</TextContainer>
	</PrecentationContainer>
)
