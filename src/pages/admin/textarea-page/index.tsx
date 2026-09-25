import { NokiaPersonSimpleType } from 'api-types/nokia.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useCallback, useMemo, useState } from 'preact/compat'

import { MentionsInput } from 'components/mention-textarea/mention-input'
import { MentionSuggest } from 'components/mention-textarea/types'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/API_ROUTE'

export const TextareaPage: FunctionComponent = () => {
	const [ personList ] = useApi<NokiaPersonSimpleType[]>(API_ROUTE.nokiaPerson)
	const [ mentionList, setMentionList ] = useState<MentionSuggest[]>([])
	const isLoading = useLoadingState([personList.status])
	const isEmpty = useEmptyDataState(personList.data)

	const appendMentionList = useCallback((newMentionList: MentionSuggest[]) => {
		setMentionList(newMentionList)
	}, [setMentionList])

	const suggestList: MentionSuggest[] = useMemo(() => {
		return personList.data.map(item => ({
			id: item.id,
			display: [item.name, item.alias, item.nick].filter(Boolean).join(' | '),
		}))
	}, [personList.data])

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="nokia">
			<pre>{JSON.stringify(mentionList, null, '\t')}</pre>
			<MentionsInput
				register={{}}
				suggestList={suggestList}
				onMention={appendMentionList}
			/>
		</div>
	)
}
