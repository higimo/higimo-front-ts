import { FunctionComponent } from 'preact'
import { ContactInfoBlock } from 'components/block-renderer/types'

export const ContactInfoRenderer: FunctionComponent<ContactInfoBlock> = ({
	phone,
	telegram,
	email,
	website,
	location,
}) => (
	<>
		<div className="contact">
			<div className="contact__item"><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></div>
			<div className="contact__item">TG: <a href={`https://t.me/${telegram.replace('@', '')}`}>{telegram}</a></div>
			<div className="contact__item"><a href={`mailto:${email}`}>{email}</a></div>
			<div className="contact__item"><a href={website}>{website}</a></div>
		</div>
		<p>{location}</p>
	</>
)
