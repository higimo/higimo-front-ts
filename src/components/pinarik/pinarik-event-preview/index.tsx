export const PinarikEventPreview = props => {
	const data = props.list.filter(i => i.id == props.id) || { description: 'data' }

	return (
		<div className="test">
			{!data.length && (
				<div className="test">выбери что-нибудь</div>
			)}
			{data.map(item => {
				return (
					<div className="test">
						<div className="test">{(new Date(item.date)).toLocaleDateString()}</div>
						<div className="test">{item.description}</div>
					</div>
				)
			})}
		</div>
	)
}
