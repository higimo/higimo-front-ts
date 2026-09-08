import { FunctionComponent } from 'preact'

import { useForceUpdate } from 'hook/utils/use-force-update'

import { PinarikForm } from 'components/pinarik/pinarik-form'
import { PinarikCalendar } from 'components/pinarik/pinarik-calendar'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import './style.css'

export const PinarikPage: FunctionComponent = () => {
	const makeUpdate = useForceUpdate()

	return (
		<div className="nokia">
			<NokiaMenu />
			<PinarikForm forceUpdate={makeUpdate} />
			<PinarikCalendar />
		</div>
	)
}
