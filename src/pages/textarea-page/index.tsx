import { FunctionComponent } from 'preact'
import { NokiaPersonApiType } from 'api-types/nokia.types'

import { useCallback, useMemo, useState } from 'preact/compat'
import useApi from 'hook/use-api'

import { NotFoundData } from 'components/ui/not-found-data'
import { MentionSuggest } from './textarea-mention/types'
import { MentionsInput } from './textarea-mention/MentionsInput'
import { Loading } from 'components/ui/loading'

import { API_ROUTE } from 'dic/api-route'

export const TextareaPage: FunctionComponent = () => {
	const [ popleList ] = useApi<NokiaPersonApiType[]>(API_ROUTE.nokiaPerson)
	const [ mentionList, setMentionList ] = useState<MentionSuggest[]>([])

	const appendMentionList = useCallback((newMentionList: MentionSuggest[]) => {
		setMentionList(newMentionList)
	}, [setMentionList])

	if (popleList.status === 'INIT' || popleList.status === 'LOADING') {
		return <Loading />
	}
	if (popleList.status === 'LOADED' && !popleList.data.length) {
		return <NotFoundData />
	}

	const suggestList: MentionSuggest[] = useMemo(() => {
		return popleList.data.map(item => ({
			id: item.id,
			display: [item.name, item.alias, item.nick].filter(Boolean).join(' | '),
		}))
	}, [popleList.data])

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
