import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { NestedListItem } from 'components/nested-list/nested-list-item'

type NestedListListPropType = {
	nestedList: NestedListItemFullType[] | null
}

export const NestedListList: FunctionComponent<NestedListListPropType> = ({ nestedList }) => nestedList && (
	<div className="list-list">
		{nestedList.map((item, key) => (
			<NestedListItem key={key} nestedListItem={item} />
		))}
	</div>
)
