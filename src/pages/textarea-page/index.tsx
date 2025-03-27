import { FunctionComponent } from 'preact'
import { PeopleType } from '../../types';

import { useCallback, useMemo, useState } from 'preact/compat';
import useApi from '../../hook/use-api';

import { Loading } from '../../components/accord/accord-single';
import { NotFoundData } from '../../components/ui/not-found-data';
import { MentionSuggest } from './textarea-mention/types';
import { MentionsInput } from './textarea-mention/MentionsInput';

export const TextareaPage: FunctionComponent = () => {
	const [ popleList ] = useApi<PeopleType>('/api/v1/nokia/people')
	const [ mentionList, setMentionList ] = useState<number[]>([])

	const appendMentionList = useCallback((value: MentionSuggest) => {
		setMentionList([...mentionList, value.id])
	}, [mentionList, setMentionList])

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

	// TODO удалять меншены!
	// TODO значение по умолчанию
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
