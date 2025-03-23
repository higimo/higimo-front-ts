import { FunctionComponent } from 'preact';

import { useEffect } from 'preact/hooks';
import { useGlobalContext } from '../../context/global';

import { ROUTE_LINKS } from '../../dic/ROUTE_LINKS';

import './style.css'

export const NotFoundPage: FunctionComponent = () => {
	const { toggleNotFound } = useGlobalContext()
	useEffect(() => {
		toggleNotFound(true)
		return () => toggleNotFound(false)
	}, [])

	document.title = 'Ошибка 404: страница не найдена'

	return (
		<div className="not-found-page">
			<h1>Страница не найдена</h1>
			<p>
				Неправильно набран адрес, или такой страницы на сайте больше не существует.
			</p>
			<p>
				<a href={ROUTE_LINKS.index}>Главная</a>
			</p>
		</div>
	)
}
