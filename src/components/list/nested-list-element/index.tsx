import { FunctionComponent } from 'preact'
import { NestedListItemFullType, NestedListItemType } from 'api-types/listlist.types'

import { useAuth } from 'hook/fetch/use-auth'

import { toast } from 'toast'
import { nestedListApi } from '../nested-list-form/nestedListApi'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { plural } from 'utils/plural'

const handleRemove = (id: NestedListItemType['id'], title: NestedListItemType['title']) => async () => {
	const res = await nestedListApi.delete(id)
	if (!!res) {
		toast.success(`Удалён [${id}] ${title}`)
	}
}

type NestedListElementPropsType = {
	nestedListItem: NestedListItemFullType
}

export const NestedListElement: FunctionComponent<NestedListElementPropsType> = ({ nestedListItem: listItem }) => {
	const { isAuth } = useAuth()

	return (
		<div className="element-node">
			{/* TODO: [BACKEND] вот бы присылало всех parent по цепочке и показывать из них хлебные крошки вложенности */}
			{!!listItem.parent && (
				<div className="element-node__parent">
					← <a href={ROUTE_LINKS.listListDetail({ idcode: listItem.parent.id.toString() })}>
						{listItem.parent.title}
					</a>
				</div>
			)}

			<div className="element-node__data">
				<div className="element-node__title">
					{/* TODO: [LIGHT] оформить id */}
					<span className="element-node__id">
						[{listItem.id}]
					</span>
					<a href={ROUTE_LINKS.listListDetail({ idcode: listItem.id.toString() })}>{listItem.title}</a>
				</div>
				<div className="element-node__meta">
					{isAuth && (
						<span className="element-node__link">
							{[
								<a href={ROUTE_LINKS.listListCreate}>создать</a>,
								<a href={ROUTE_LINKS.listListEdit({ idcode: listItem.id.toString() })}>редактировать</a>,
								<span
									className="pseudo-link"
									onClick={handleRemove(listItem.id, listItem.title)}
								>
									удалить
								</span>
							]}
						</span>
					)}
					{!!listItem.children?.length && (
						<div className="element-node__child-count">
							{`${listItem.children.length} ${plural(listItem.children.length, ['элемент', 'элемента', 'элементов'])} в списке`}
						</div>
					)}
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

			{/* TODO: [LIGHT] добавить отступ вложенности */}
			{!!listItem.children && listItem.children.map((item, iter) => (
				<NestedListElement key={iter} nestedListItem={item} />
			))}
		</div>
	)
}
