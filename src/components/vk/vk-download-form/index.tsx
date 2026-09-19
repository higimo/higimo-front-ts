import { FunctionComponent } from 'preact'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { VkButton } from 'components/vk/vk-button'
import { VkParagraph } from 'components/vk/vk-paragraph'

import { VkDownloadFormValuesType } from 'components/vk/vk-download-form/types'

type VkDownloadFormContainerPropsType = {
	onSubmit: (values: VkDownloadFormValuesType) => void
}

export const VkDownloadForm: FunctionComponent<VkDownloadFormContainerPropsType> = ({
	onSubmit
}) => {
	const {
		register,
		handleSubmit,
		watch,
	} = useForm<VkDownloadFormValuesType>({
		mode: 'onChange',
	})

	useEffect(() => {
		const subscription = watch(() => {
			// TODO: тротлер/дебаунс бы добавить
			handleSubmit(onSubmit)()
		})
		return () => subscription.unsubscribe()
	}, [watch, handleSubmit])

	return (
		<div className="download-page__input">
			<form
				autocomplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<VkParagraph variant="caption">Ид группы</VkParagraph>
					<input type="number" {...register('groupId')} placeholder="120" />
				</div>
				<div>
					<VkParagraph variant="caption">Ид пользователя</VkParagraph>
					<input type="number" {...register('userId')} placeholder="510" />
					{' '}
					<VkButton variant="tertiary" type="submit">
						Скачать свои
					</VkButton>
				</div>
			</form>
		</div>
	)

}
