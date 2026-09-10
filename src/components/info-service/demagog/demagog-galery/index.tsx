import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { DemagogElement } from 'components/info-service/demagog/demagog-element'

import './style.css'

type DemagogGaleryPropsType = {
	demagogs: DemagogType[]
}
export const DemagogGalery: FunctionComponent<DemagogGaleryPropsType> = ({ demagogs }) => (
	<div className="demagog">
		{demagogs.map(item => <DemagogElement {...item} />)}
	</div>
)
