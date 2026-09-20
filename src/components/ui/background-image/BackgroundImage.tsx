import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import './style.css'

type BackgroundImagePropsType = ClassNameType & {
	src: string
}

export const BackgroundImage: FunctionComponent<BackgroundImagePropsType> = ({ src, children }) => (
	<div className="background-image">
		<div
			className="background-image__cover"
			style={{
				backgroundImage: `url(${src})`,
			}}
		/>
		<div className="background-image__child">
			{children}
		</div>
	</div>
)
