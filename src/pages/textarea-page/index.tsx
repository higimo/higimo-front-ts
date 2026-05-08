import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useCallback, useMemo, useState } from 'preact/compat'
import useApi from 'hook/use-api'

import { NotFoundData } from 'components/ui/not-found-data'
import { MentionSuggest } from './textarea-mention/types'
import { MentionsInput } from './textarea-mention/MentionsInput'
import { Loading } from 'components/ui/loading'

import { API_ROUTE } from 'dic/api-route'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

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
				suggestList={suggestList}
				onMention={appendMentionList}
			/>
		</div>
	)
}
