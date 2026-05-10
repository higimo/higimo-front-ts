import { NOTEBOOK_SPECS } from "./data"

export const ThingsNotebook = () => (
	<div className="content">
		<h1>Ноутбук</h1>
		<p>Ультрабук ASUS ZenBook S UX391UA-ET084T</p>
		<table>
			<tbody>
				{NOTEBOOK_SPECS.map(([label, value], i) => (
					<tr key={i}><td>{label}</td><td>{value}</td></tr>
				))}
			</tbody>
		</table>
	</div>
)
