import { FunctionComponent } from 'preact'
import { ListListType } from 'types'

import { useAuth } from 'hook/use-auth'

import sendRequest from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

const handleRemove = id => () => {
	sendRequest(API_ROUTE.listerItemSingle({ id }), {
		method: 'DELETE',
	}).then(console.log)
}

export const ListListElement: FunctionComponent<{ listItem: ListListType }> = ({ listItem }) => {
	const { isAuth } = useAuth()

	return (
		<div className="element-node">
			{!!listItem.parent && (
				<div className="element-node__parent">
					← <a href={ROUTE_LINKS.listListDetail({ idcode: listItem.parent.id.toString() })}>
						{listItem.parent.title}
					</a>
				</div>
			)}
			<div className="element-node__data">
				<div className="element-node__title">
					<a href={ROUTE_LINKS.listListDetail({ idcode: listItem.id.toString() })}>{listItem.title}</a>
				</div>
				<div className="element-node__meta">
					{isAuth && (
						<span className="element-node__link">
							{[
								<a href={ROUTE_LINKS.listListCreate}>создать</a>,
								<a href={ROUTE_LINKS.listListEdit({ idcode: listItem.id.toString() })}>редактировать</a>,
								<span className="pseudo-link" onClick={handleRemove(listItem.id)}>удалить</span>
							]}
						</span>
					)}
					{!!listItem.children?.length && <div className="element-node__child-count">{listItem.children.length} элементов в списке</div>}
				</div>
			</div>
			{!!listItem.values?.length && (
				<div className="element-node__values">
					{listItem.values.map(value => (
						<div className="element-node__value">
							<div className="element-node__value-group">
								{value.property.name}
							</div>
							<div className="element-node__value-value">
								{value.value}
							</div>
						</div>
					))}
				</div>
			)}
			{!!listItem.children && listItem.children.map((item, iter) => (
				<ListListElement key={iter} listItem={item} />
			))}
		</div>
	)
}
