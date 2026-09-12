import { FunctionComponent, TargetedEvent } from 'preact'

import { VkButton } from 'components/vk/vk-button'
import { VkParagraph } from 'components/vk/vk-paragraph'

type ChangeEvent = TargetedEvent<HTMLInputElement, InputEvent>

type VkDownloadFormPropsType = {
	onGroupId: (event: ChangeEvent) => void | null
	onUserId: (event: ChangeEvent) => void
	onSelf: () => void | null
}

export const VkDownloadForm: FunctionComponent<VkDownloadFormPropsType> = ({
	onGroupId,
	onUserId,
	onSelf,
}) => (
	<div className="download-page__input">
		<form onSubmit={() => {}}>
			<div>
				<VkParagraph variant="caption">Ид группы</VkParagraph>
				<input placeholder="120" onChange={onGroupId} />
			</div>
			<div>
				<VkParagraph variant="caption">Ид группы</VkParagraph>
				<input placeholder="510" onChange={onUserId} />
			</div>
			<br />
			<div>
				<VkButton variant="primary" onClick={onSelf}>
					Скачать свои
				</VkButton>
				<VkParagraph variant="caption">
					Тут всё автоматически
				</VkParagraph>
			</div>
		</form>
	</div>
)
