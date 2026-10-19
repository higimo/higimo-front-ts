import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { NestedListDetail } from 'components/nested-list/nested-list-detail'

type NestedListListPropType = {
	nestedList: NestedListItemFullType[]
}

export const NestedListList: FunctionComponent<NestedListListPropType> = ({
	nestedList,
}) => (
	<div className="list-list">
		{nestedList.map((item, key) => (
			<NestedListDetail key={key} nestedListItem={item} />
		))}
	</div>
)
