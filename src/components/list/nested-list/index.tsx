import { FunctionComponent } from 'preact'
import { NestedListItem } from 'api-types/listlist.types'

import { NestedListElement } from 'components/list/nested-list-element'

type NestedListPropType = {
	nestedList: NestedListItem[]
}

export const NestedList: FunctionComponent<NestedListPropType> = ({ nestedList }) => (
	<div className="list-list">
		{nestedList.map((item, iter) => (
			<NestedListElement key={iter} nestedListItem={item} />
		))}
	</div>
)
