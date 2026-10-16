import { FunctionComponent } from 'preact'
import { VkDownloadFormValuesType } from 'components/vk/vk-download-form/types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'

import { debounce } from '@github/mini-throttle'
import { vkSession } from 'context/vk-signal'
import { FieldRow } from 'components/form/field-row'

type VkDownloadFormContainerPropsType = {
	onSubmit: (values: VkDownloadFormValuesType) => void
}

export const VkDownloadForm: FunctionComponent<VkDownloadFormContainerPropsType> = ({
	onSubmit
}) => {
	const { session } = vkSession.value
	const formMethods = useForm<VkDownloadFormValuesType>({
		mode: 'onChange',
	})

	useEffect(() => {
		const debouncedSubmit = debounce(() => {
			formMethods.handleSubmit(onSubmit)()
		}, 500)

		const subscription = formMethods.watch(() => {
			debouncedSubmit()
		})

		return () => {
			subscription.unsubscribe()
			debouncedSubmit.cancel()
		}
	}, [formMethods.watch, formMethods.handleSubmit])

	const handlerDownloadSelf = () => {
		if (session?.user.id) {
			formMethods.setValue('userId', session?.user.id)
		}
	}

	return (
		<FromContainer variant="inner">
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					autocomplete="off"
				>
					<FiledForm name="groupId" label="Ид группы" type="number" placeholder="120" />
					<FieldRow>
						<FiledForm name="userId" label="Ид пользователя" type="number" placeholder="510" />
						<ButtonGroup variant="gap">
							<FormButton type="button" variant="ghost" onClick={handlerDownloadSelf}>
								Подставить свой ид
							</FormButton>
						</ButtonGroup>
					</FieldRow>
				</form>
			</FormProvider>
		</FromContainer>
	)

}
