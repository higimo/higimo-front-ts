import { FunctionComponent } from 'preact'
import { VkDownloadFormValuesType } from 'components/vk/vk-download-form/types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { InnerFromContainer } from 'components/form/inner-from-container'
import { VkButton } from 'components/vk/vk-button'
import { VkParagraph } from 'components/vk/vk-paragraph'

import { debounce } from '@github/mini-throttle'
import { vkSession } from 'context/vk-signal'

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
		<div className="download-page__input">
			<InnerFromContainer>
				<FormProvider {...formMethods}>
					<form
						onSubmit={formMethods.handleSubmit(onSubmit)}
						autocomplete="off"
					>
						<FiledForm name="groupId" label="Ид группы" type="number" placeholder="120" />
						<FiledForm name="userId" label="Ид пользователя" type="number" placeholder="510" />
						{/* TODO: [MIDDLE] в идеале поставить слева кнопку */}
						<ButtonGroup variant="gap">
							<FormButton type="button" variant="outline" onClick={handlerDownloadSelf}>
								Подставить свой ид
							</FormButton>
						</ButtonGroup>
					</form>
				</FormProvider>
			</InnerFromContainer>
			{/* TODO: [LIGHT] ой, осталось */}
			<form
				autocomplete="off"
				onSubmit={formMethods.handleSubmit(onSubmit)}
			>
				<div>
					<VkParagraph variant="caption">Ид группы</VkParagraph>
					<input type="number" {...formMethods.register('groupId')}  />
				</div>
				<div>
					<VkParagraph variant="caption">Ид пользователя</VkParagraph>
					<input type="number" {...formMethods.register('userId')}  />
					{' '}
					{/* TODO: [LIGHT] ну тогда и удалить компонент */}
					<VkButton variant="tertiary" type="submit">
						Скачать свои
					</VkButton>
				</div>
			</form>
		</div>
	)

}
