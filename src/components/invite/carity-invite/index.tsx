import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

export const CharityInvite: FunctionComponent = () => (
	<PrecentationContainer className="charity-intro">
		<TextContainer>
			<div className="charity-intro__intro-container">
				<p className="charity-intro__intro-content">
					Больше всего на свете, я уважаю
					и обожаю <span className="charity-intro__accent">гуманистические проекты</span>.
					Если вы хотите поддержать эти удивительные проекты и сделать мир лучше:
				</p>
			</div>
		</TextContainer>

		<TextContainer>
			<ul className="charity-intro__list">
				<li className="charity-intro__item">
					<h3 className="charity-intro__name">
						<a href="https://archive.org/donate?origin=iawww-TopNavDonateButton">Internet Archive</a>
					</h3>
					<p className="charity-intro__description">
						Он же Wayback Machine, роботы, которые сохраняют страницы интернета.
						Это культурные артефакты, которых больше нигде в мире нет.
						Мем, что попавшее в интернет остаётся там навсегда, никогда не работал.
						Например, здесь хранятся флеш-игры, сам факт их хранения — маленькое чудо.
					</p>
				</li>
				<li className="charity-intro__item">
					<h3 className="charity-intro__name">
						<a href="https://wikimediafoundation.org/give/">Wikipedia</a>
					</h3>
					<p className="charity-intro__description">
						Всемирная и самая большая в мире энциклопедия.
						Я потратил на неё несколько лет своей жизни, развил несколько
						русскоязычных разделов, чтобы эта часть культуры просто осталась,
						а не растворилась. Быть причастным — невероятно приятное чувство.
					</p>
				</li>
				<li className="charity-intro__item">
					<h3 className="charity-intro__name">
						<a href="https://my.fsf.org/donate">Ричард Столлман</a>
					</h3>
					<p className="charity-intro__description">
						Создатель идеи свободного программного обеспечения.
						На его идеях основано всё то, почему сейчас работает не только Google,
						Яндекс и Tencent, где, как известно, разрабатывают всё своё, включая
						языки программирования. Его огромная заслуга в свободности современного мира.
					</p>
				</li>
			</ul>
		</TextContainer>
	</PrecentationContainer>
)






