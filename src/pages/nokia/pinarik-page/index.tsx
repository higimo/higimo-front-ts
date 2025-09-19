import { FunctionComponent } from 'preact'

import { PinarikForm } from 'components/pinarik/pinarik-form'
import { PinarikCalendar } from 'components/pinarik/pinarik-calendar'

import { useState, useCallback } from 'preact/hooks'

import './style.css'
import { NokiaMenu } from 'components/nokia/nokia-menu'

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
