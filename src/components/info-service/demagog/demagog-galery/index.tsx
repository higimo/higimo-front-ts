import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { DemagogElement } from 'components/info-service/demagog/demagog-element'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type DemagogGaleryPropsType = {
	demagogList: DemagogType[] | null
}

export const DemagogGalery: FunctionComponent<DemagogGaleryPropsType> = ({ demagogList }) => demagogList && (
	<div className="demagog">
		{demagogList.map(item => <DemagogElement {...item} />)}
	</div>
)
