import { FunctionComponent } from 'preact'

import './style.css'

export const Emailer: FunctionComponent = () => (
	<div className="emailer-tool">
		<ul className="main-menu">
			<li><a href="./?email">Сменить электропочту</a></li>
			<li><a href="./?may">Поддерживаемые сайты</a></li>
		</ul>
		<form>
			<label>Статью по ссылке на почту</label>
			<input type="text" name="url" value="" autofocus={true} />
			<button>Получить</button>
		</form>
	</div>
)
