import { FormFieldScheme, FormScheme } from 'api-types/form.types'

import { FiledForm } from 'components/form/filed-form'

type RenderFormSchemePropsType<T extends object> = {
	formScheme: FormScheme<T>
}

export const RenderFormScheme = <T extends object>({
	formScheme,
}: RenderFormSchemePropsType<T>) => (
	<>
		{Object.entries(formScheme).map(([code, scheme]) => {
			const field = scheme as FormFieldScheme<keyof T>
			return (
				<FiledForm
					key={code}
					name={code}
					type={field.type}
					label={field.title}
					values={field.values}
				/>
			)
		})}
	</>
)
