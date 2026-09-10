import { FunctionComponent } from 'preact'
import { ListListType } from 'api-types/listlist.types'

import { useAuth } from 'hook/fetch/use-auth'

import { toast } from 'toast'
import sendRequest, { ApiError } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const handleRemove = (id: ListListType['id']) => async () => {
	try {
		await sendRequest(API_ROUTE.listerItemSingle({ id: id.toString() }), {
			method: 'DELETE',
		})
		toast.show('Элемент удалён')
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Ошибка при входе в систему')
	}
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
