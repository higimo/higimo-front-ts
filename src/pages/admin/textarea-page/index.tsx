import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useCallback, useMemo, useState } from 'preact/compat'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MentionsInput } from 'components/mention-textarea/mention-input'
import { MentionSuggest } from 'components/mention-textarea/types'

import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: [LIGHT] да удалить нахуй
export const TextareaPage: FunctionComponent = () => {
	const [ personList ] = useApi<NokiaPersonSimpleType[]>(API_ROUTE.nokiaPerson)
	const [ mentionList, setMentionList ] = useState<MentionSuggest[]>([])

	const appendMentionList = useCallback((newMentionList: MentionSuggest[]) => {
		setMentionList(newMentionList)
	}, [setMentionList])

	const suggestList: MentionSuggest[] = useMemo(() => {
		return personList.data.map(item => ({
			id: item.id,
			display: [item.name, item.alias, item.nick].filter(Boolean).join(' | '),
			person: item,
		}))
	}, [personList.data])


	return (
		<Layout title="Textarea test">
			<div className="nokia">
				<pre>{JSON.stringify(mentionList, null, '\t')}</pre>

				<LoadSuspense data={personList}>
					<EmptyData data={personList}>
						<MentionsInput
							register={{}}
							suggestList={suggestList}
							onMention={appendMentionList}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
