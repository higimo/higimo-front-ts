import { Component } from 'preact'

export default class Redirect extends Component {
	componentDidMount() {
		// @ts-ignore
		route(this.props.to, true)
	}

	render() {
		return null
	}
}
