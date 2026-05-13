import './style.css'

export const Disclamer = ({ config: { data } }) => (
	<div className="disclaimer" dangerouslySetInnerHTML={{__html: data}} />
)
