import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { NestedListElement } from 'components/list/nested-list-element'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type NestedListPropType = {
	nestedList: NestedListItemFullType[] | null
}

export const NestedList: FunctionComponent<NestedListPropType> = ({ nestedList }) => nestedList && (
	<div className="list-list">
		{nestedList.map((item, iter) => (
			<NestedListElement key={iter} nestedListItem={item} />
		))}
	</div>
)
