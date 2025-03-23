import { FunctionComponent } from 'preact'

import { HorizontalMenu } from '../../ui/horizontal-menu'
import { TextContainer } from '../../ui/text-container'
import { OnlyAdmin } from '../../util/only-admin'

import './style.css'

export const MyItemsInvite: FunctionComponent = () => (
	<div className="my-items-invite">
		<TextContainer>
			<h2 className="my-items-invite__header">
				Мои Вещи <OnlyAdmin>(подключи мне бекенд)</OnlyAdmin>
			</h2>
		</TextContainer>
		<HorizontalMenu className="my-items-invite__gallery">
			<div className="my-items-invite__item">
				<div className="my-items-invite__title">
					Ноутбук
				</div>
				<div className="my-items-invite__description">
					Ультрабук ASUS ZenBook S UX391UA-ET084T
				</div>
			</div>
			<div className="my-items-invite__item">
				<div className="my-items-invite__title">
					Велосипед
				</div>
				<div className="my-items-invite__description">
					Forward NEXT 27,5 3.0 disc, 27.5
				</div>
			</div>
		</HorizontalMenu>
	</div>
)
