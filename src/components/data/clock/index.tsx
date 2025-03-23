import './style.css'

export const Clock = ({ hour = 9, minute = 30 }) => (
	<div id="watch">
		<style
			dangerouslySetInnerHTML={{
				__html: 
				`#watch .hours-hand { transform: rotate(${(hour * 30) + (minute / 2)}deg) }` +
				`#watch .minutes-hand { transform: rotate(${minute * 6}deg) }`
			}}
		/>
		<div className="frame-face"></div>
		<div className="hours-hand"></div>
		<div className="minutes-hand"></div>
		<div className="minute-marks">
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
			<span className="minute-mark"></span>
		</div>
	</div>
)
