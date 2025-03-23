import './style.css'

export const Disclamer = ({ config: { data, type } }) => (
	<div className="disclaimer" dangerouslySetInnerHTML={{__html: data}} />
)
