import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { NestedListItem } from 'components/nested-list/nested-list-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type NestedListListPropType = {
	nestedList: NestedListItemFullType[] | null
}

export const NestedListList: FunctionComponent<NestedListListPropType> = ({ nestedList }) => nestedList && (
	<div className="list-list">
		{nestedList.map((item, iter) => (
			<NestedListItem key={iter} nestedListItem={item} />
		))}
	</div>
)
