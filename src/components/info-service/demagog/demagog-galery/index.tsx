import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { DemagogElement } from 'components/info-service/demagog/demagog-element'

import './style.css'

type DemagogGaleryPropsType = {
	demagogList: DemagogType[] | null
}

export const DemagogGalery: FunctionComponent<DemagogGaleryPropsType> = ({ demagogList }) => demagogList && (
	<div className="demagog">
		{demagogList.map(item => <DemagogElement {...item} />)}
	</div>
)
