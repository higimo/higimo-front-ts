import { Component, h } from 'preact'
// import * as component from '../common'
import sendRequest from '../../utils/send-request'

export class ListkeeperFromUrl extends Component {
	state = {
		list: [],
		data: {},
	}

	componentWillMount() {
		this.getData(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.getData(nextProps)
	}

	getData = (props) => {
		sendRequest(props.config.url)
			.then(list => this.setState({ list }))

		const dataFromUrl = props.config.dataFromUrl || null
		if (dataFromUrl) {
			Object.keys(dataFromUrl).map(key => {
				sendRequest(dataFromUrl[key])
					.then(data => {
						this.setState(prevState => ({
							data: {
								// @ts-ignore
								...prevState.data,
								[key]: data,
							}
						}))
					})
			})
		}
	}

	// @ts-ignore
	render({ config: { childComponent, className } }) {
		return (
			<div className={`${className} listkeeper-from-url`}>
				{this.state.list.map(item => h(
					// @ts-ignore
					component[childComponent],
					{
						...item,
						data: this.state.data,
					}
				))}
			</div>
		)
	}
}
