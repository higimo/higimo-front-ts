import { ClassNameType } from 'utils.type'

import { FieldValues, FieldPath, useController } from 'react-hook-form'

import cs from 'classnames'

import './style.css'

const SCORE_VALUES = [-1, 0, 1] as const

type TrafficLightPropsType<T extends FieldValues> = ClassNameType & {
	name: FieldPath<T>
}

export const TrafficLight = <T extends FieldValues>({
	name,
	className,
}: TrafficLightPropsType<T>) => {
	const { field } = useController<T>({ name })

	return (
		<div className={cs('score-field', className)}>
			{SCORE_VALUES.map(value => (
				<div
					key={value}
					className={cs('score-field__item', { active: field.value === value })}
					onClick={() => field.onChange(value)} />
			))}
		</div>
	)
}
