import { FunctionComponent } from 'preact'

import { FormField } from 'components/admin-tool/form-field'

import { DEFAULT_STATE } from 'components/admin-tool/hook/useToolForm'

export const Sidebar: FunctionComponent<{
	formData: typeof DEFAULT_STATE
	onFieldChange: (name: string, value: string) => void
	onSubmit: () => void
}> = ({ formData, onFieldChange, onSubmit }) => (
	<div className="tool-page__sidebar">
		<FormField
			label="Method"
			name="method"
			value={formData.method}
			onChange={onFieldChange}
		/>
		<FormField
			type="textarea"
			label="URI"
			name="uri"
			value={formData.uri}
			onChange={onFieldChange}
		/>
		<FormField
			type="textarea"
			label="options"
			name="options"
			value={formData.options}
			onChange={onFieldChange}
		/>
		<button onClick={onSubmit}>Отправить</button>
	</div>
)
