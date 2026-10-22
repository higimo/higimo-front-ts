import { FunctionComponent } from 'preact'
import { NestedListItemFullType, NestedListItemType } from 'api-types/listlist.types'

import { useAuth } from 'hook/fetch/use-auth'

import { handleApiError } from 'utils/api/handle-errors/handle-api-error'
import { nestedListApi } from 'repositories/nested-list-api.repository'
import { plural } from 'utils/plural'
import { toast } from 'toast'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

const handleRemove = (id: NestedListItemType['id'], title: NestedListItemType['title']) => async () => {
	try {
		const res = await nestedListApi.delete(id)
		if (!!res) {
			toast.success(`Удалён [${id}] ${title}`)
		}
	} catch (error) {
		handleApiError(error)
	}
}

type NestedListDetailPropsType = {
	nestedListItem: NestedListItemFullType
}

export const NestedListDetail: FunctionComponent<NestedListDetailPropsType> = ({
	nestedListItem,
}) => {
	const { isAuth } = useAuth()

	return (
		<div className="element-node">
			{/* TODO: [BACKEND] вот бы присылало всех parent по цепочке и показывать из них хлебные крошки вложенности */}
			{!!nestedListItem.parent && (
				<div className="element-node__parent">
					← <a href={ROUTE_LINK.listListDetail({ idcode: nestedListItem.parent.id })}>
						{nestedListItem.parent.title}
					</a>
				</div>
			)}

			<div className="element-node__element">

				<div className="element-node__tech-info">
					<span className="element-node__id">
						№ {nestedListItem.id}
					</span>
				</div>

				<div className="element-node__main-info">
					<div className="element-node__title">
						<a href={ROUTE_LINK.listListDetail({ idcode: nestedListItem.id })}>
							{nestedListItem.title}
						</a>
					</div>

					<div className="element-node__meta">

						{!!nestedListItem.children?.length && (
							<div className="element-node__child-count">
								{`${nestedListItem.children.length} ${plural(nestedListItem.children.length, ['элемент', 'элемента', 'элементов'])} в списке`}
							</div>
						)}

						{isAuth && (
							<span className="element-node__admin-controll">
								{[
									<a href={ROUTE_LINK.listListCreate}>создать</a>,
									<a href={ROUTE_LINK.listListEdit({ idcode: nestedListItem.id })}>редактировать</a>,
									<span
										className="pseudo-link"
										onClick={handleRemove(nestedListItem.id, nestedListItem.title)}
									>
										удалить
									</span>
								]}
							</span>
						)}
					</div>
				</div>
			</div>

			{!!nestedListItem.values?.length && (
				<div className="element-node__values">
					{nestedListItem.values.map(value => (
						<div key={value.id} className="element-node__value">
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

			{!!nestedListItem.children && nestedListItem.children.map((item, key) => (
				<NestedListDetail key={key} nestedListItem={item} />
			))}
		</div>
	)
}
