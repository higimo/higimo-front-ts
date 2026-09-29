// TODO: [BACKEND] а как этим пользоваться, лол?
import { FunctionComponent } from 'preact'

import { useApiRequest } from 'hook/useApiRequest'
import { useCallback } from 'preact/hooks'
import { useToolForm } from 'hook/useToolForm'

import { AdminToolContent } from 'components/admin-tool/admin-tool-content'
import { Layout } from 'components/ui/layout/Layout'
import { Sidebar } from 'components/admin-tool/sidebar'

import { parseJsonWithFallback } from 'utils/parse-json-with-fallback'

import './style.css'

export const ToolPage: FunctionComponent = () => {
	const { formData, response, updateField, setResponse } = useToolForm()
	const { sendRequest } = useApiRequest()

	const handleSubmit = useCallback(async () => {
		const { method, uri, options: optionsStr } = formData

		const parsedOptions = parseJsonWithFallback(optionsStr)

		try {
			const result = await sendRequest(method, uri, parsedOptions)
			setResponse(result)
		} catch (error) {
			setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}, [formData, sendRequest, setResponse])

	return (
		<Layout title="Tool" className="tool-page">
			<Sidebar
				formData={formData}
				onFieldChange={updateField}
				onSubmit={handleSubmit}
			/>
			<AdminToolContent response={response} />
		</Layout>
	)
}
