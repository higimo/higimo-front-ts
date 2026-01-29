import { Component } from 'preact'
import httpBuildQuery  from 'http-build-query'

export class ToolPage extends Component {
	state = {
		login: '',
		password: '',
		method: 'POST',
		json: '',
		php: '',
		methodList: [],
		options: '{\nlang: "ru"\n}',
		uri: 'feedback/page',
	}

	handlerSubmit = (event) => {
		let { options, uri } = this.state,
			self = this

		try {
			options = JSON.parse(options)
		} catch (e) {
			try {
				options = JSON.parse(`${options.replace(/^(\s*?)(\S*?):/gm, '$1"$2":')}`)
			} catch (e) {
				console.error(e)
			}
		}

		if (typeof window !== 'undefined') {
			var xhttp = new XMLHttpRequest()
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let json = '',
						php = '',
						debug = ''
					try {
						let jsonObj = JSON.parse(this.responseText)

						json = JSON.stringify(jsonObj.data, null, '\t')
					} catch (e) {
						json = this.responseText
					}
					self.setState({json})
				}
			}

			xhttp.open(this.state.method, `/api/v2/${uri}`, true)

			xhttp.setRequestHeader('Authorization', `Basic ${btoa(`${this.state.login}:${this.state.password}`)}`)
			if (this.state.method === 'GET') {
				xhttp.setRequestHeader('Accept', 'application/json')
				xhttp.setRequestHeader('Content-Type', 'application/json')
			} else {
				xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			}

			xhttp.send(httpBuildQuery(options))
		}
	}

	handlerChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className="tool-page">
				<div className="tool-page__sidebar">
					<div>
						login:
						{/* @ts-ignore */}
						<input value={this.state.login} name="login" onInput={this.handlerChange} />
					</div>
					<div>
						password:
						{/* @ts-ignore */}
						<input value={this.state.password} type="password" name="password" onInput={this.handlerChange} />
					</div>
					<div>
						method:
						{/* @ts-ignore */}
						<input value={this.state.method} name="method" onInput={this.handlerChange} />
					</div>
					<div>
						uri:
						{/* @ts-ignore */}
						<textarea value={this.state.uri} name="uri" onInput={this.handlerChange} />
					</div>
					<div>
						options:
						{/* @ts-ignore */}
						<textarea value={this.state.options} name="options" onInput={this.handlerChange} />
					</div>
					<button onClick={this.handlerSubmit}>Отправить</button>
				</div>
				<div className="tool-page__content">
					<pre dangerouslySetInnerHTML={{__html: this.state.json}} />
				</div>
			</div>
		)
	}
}
