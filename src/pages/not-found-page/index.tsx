import { FunctionComponent } from 'preact'

import { useEffect } from 'preact/hooks'

import { Layout } from 'components/ui/layout/Layout'

import { setIsNotFound } from 'context/global'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const NotFoundPage: FunctionComponent = () => {
	useEffect(() => {
		setIsNotFound(true)
		return () => setIsNotFound(false)
	}, [])

	return (
		<Layout title="Ошибка 404: страница не найдена" className="not-found-page">
			<h1>Страница не найдена</h1>
			<p>
				Неправильно набран адрес, или такой страницы на сайте больше не существует.
			</p>
			<p>
				<a href={ROUTE_LINKS.index}>Главная</a>
			</p>
		</Layout>
	)
}
