import { FunctionComponent } from 'preact'
import { NestedListItemFullType, NestedListItemType } from 'api-types/listlist.types'

import { useAuth } from 'hook/fetch/use-auth'

import { nestedListApi } from 'repositories/nested-list-api.repository'
import { plural } from 'utils/plural'
import { toast } from 'toast'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

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
					← <a href={ROUTE_LINKS.listListDetail({ idcode: listItem.parent.id })}>
						{listItem.parent.title}
					</a>
				</div>
			)}

			<div className="element-node__element">

				<div className="element-node__tech-info">
					<span className="element-node__id">
						№ {listItem.id}
					</span>
				</div>

				<div className="element-node__main-info">
					<div className="element-node__title">
						<a href={ROUTE_LINKS.listListDetail({ idcode: listItem.id })}>
							{listItem.title}
						</a>
					</div>

					<div className="element-node__meta">

						{!!listItem.children?.length && (
							<div className="element-node__child-count">
								{`${listItem.children.length} ${plural(listItem.children.length, ['элемент', 'элемента', 'элементов'])} в списке`}
							</div>
						)}

						{isAuth && (
							<span className="element-node__admin-controll">
								{[
									<a href={ROUTE_LINKS.listListCreate}>создать</a>,
									<a href={ROUTE_LINKS.listListEdit({ idcode: listItem.id })}>редактировать</a>,
									<span
										className="pseudo-link"
										onClick={handleRemove(listItem.id, listItem.title)}
									>
										удалить
									</span>
								]}
							</span>
						)}
					</div>
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
				<NestedListElement key={iter} nestedListItem={item} />
			))}
		</div>
	)
}
