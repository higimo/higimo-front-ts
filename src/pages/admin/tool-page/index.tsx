// TODO: [BACKEND] а как этим пользоваться, лол?
import { FormValues } from 'components/admin-tool/sidebar'
import { FunctionComponent } from 'preact'
import { SendRequestOptions } from 'utils/api/send-request'

import { useCallback, useState } from 'preact/hooks'

import { AdminToolContent } from 'components/admin-tool/admin-tool-content'
import { Layout } from 'components/ui/layout/Layout'
import { Sidebar } from 'components/admin-tool/sidebar'

import { parseJson } from 'utils/parse-json'
import { sendRequest } from 'utils/api/send-request'
import { toast } from 'toast'

import './style.css'

export const ToolPage: FunctionComponent = () => {
	const [response, setResponse] = useState('')

	const handleSubmit = useCallback(async (values: FormValues) => {
		try {
			let parsedOptions = parseJson(values.options) as SendRequestOptions
			const options: SendRequestOptions = { ...parsedOptions, method: values.method }

			const result = await sendRequest(values.uri, options)
			setResponse(JSON.stringify(result))
		} catch (error) {
			toast.warning(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}, [sendRequest, setResponse])

	return (
		<Layout title="Tool" className="tool-page">
			<div className="tool-page__sidebar">
				<Sidebar
					onSubmit={handleSubmit}
				/>
			</div>
			<AdminToolContent
				response={response}
			/>
		</Layout>
	)
}
