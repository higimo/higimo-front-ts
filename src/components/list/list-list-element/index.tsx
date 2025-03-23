import { FunctionComponent } from 'preact'
import { ListListType } from '../../../types'

import { useAuth } from '../../../hook/use-auth'

import sendRequest from '../../../utils/send-request'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import './style.css'

// list: `?withChild=true&filter[code]=${idcode}&filter[id]=${idcode}`,

const handleRemove = id => () => {
	sendRequest(`/api/v1/lister/item/${id}`, {
		method: 'DELETE',
	}).then(console.log)
}

export const ListListElement: FunctionComponent<ListListType> = ({ id, title, child }) => {
	const { isAuth } = useAuth()

	return (
		<div className="element-node">
			<div className="element-node__data">
				<div className="element-node__title">
					<a href={ROUTE_LINKS.listListDetail({ idcode: id.toString() })}>{title}</a>
				</div>
				<div className="element-node__meta">
					{isAuth && (
						<span className="element-node__link">
							{[
								<a href={ROUTE_LINKS.listListCreate}>создать</a>,
								<a href={ROUTE_LINKS.listListEdit({ idcode: id.toString() })}>редактировать</a>,
								<span className="pseudo-link" onClick={handleRemove(id)}>удалить</span>
							]}
						</span>
					)}
					{!!child.length && <div className="element-node__child-count">{child.length} элементов в списке</div>}
				</div>
			</div>
			{!!child && child.map((item, iter) => (
				<ListListElement key={iter} {...item} />
			))}
		</div>
	)
}
