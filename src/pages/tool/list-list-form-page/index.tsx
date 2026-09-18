import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useState, useEffect } from 'preact/hooks'

import { NestedListForm } from 'components/list/nested-list-form'
import { NestedListItem } from 'api-types/listlist.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ListListFormPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	const { params: { idcode = '' } } = useRoute()
	const [ values, setValues ] = useState<NestedListItem | undefined>()

	useEffect(() => {
		// TODO: [MIDDLE] может useApi всё же прикрутить?
		sendRequest(API_ROUTE.listerItemSingle({ id: idcode }))
			.then(val => setValues(val.data[0]))
	}, [idcode])

	return (
		<div className="list-list">
			<NestedListForm values={values} />
		</div>
	)
}
