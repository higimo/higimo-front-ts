import { FunctionComponent } from 'preact'

import { useState, useCallback } from 'preact/hooks'

import { PinarikForm } from 'components/pinarik/pinarik-form'
import { PinarikCalendar } from 'components/pinarik/pinarik-calendar'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import './style.css'

export const PinarikPage: FunctionComponent = () => {
	const [, setA ] = useState(false)
	const makeUpdate = useCallback(() => setA(pState => !pState), [setA])

	return (
		<div className="nokia">
			<NokiaMenu />
			<PinarikForm forceUpdate={makeUpdate} />
			<PinarikCalendar />
		</div>
	)
}
