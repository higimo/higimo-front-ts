import { FunctionComponent } from 'preact'

type NokiaUserAvatarPropsType = {
	name: string
}

export const NokiaUserAvatar: FunctionComponent<NokiaUserAvatarPropsType> = (props) => (
	<div className="nokia-user-avatar">
		{props.name.substring(0, 1).toUpperCase()}
	</div>
)
