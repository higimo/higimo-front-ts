import { FunctionComponent } from 'preact'
import { NokiaPersonApiType, NokiaPersonType } from 'api-types/nokia.types'
import { UseFormReturn } from 'react-hook-form'
import { MeetingFormValues } from 'components/nokia/form/hooks/use-meeting-form'

import { Fragment } from 'preact/jsx-runtime'

import { NokiaPersonTag } from 'components/nokia/nokia-person-tag'
import { CollapseSection } from 'components/ui/collapse-section'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

interface NokiaMeetingPersonFieldsProps {
	formMethods: UseFormReturn<MeetingFormValues>
	topPersons: NokiaPersonType[]
	persons: NokiaPersonType[]
	handleAddPerson: (person: NokiaPersonApiType) => void
	handleRemovePerson: (person: NokiaPersonApiType) => void
}

export const NokiaMeetingPersonFields: FunctionComponent<NokiaMeetingPersonFieldsProps> = ({
	formMethods: { watch },
	topPersons,
	persons,
	handleRemovePerson,
	handleAddPerson,
}) => {
	const selectedPersons = watch('persons') || []

	const selectedPersonIds = selectedPersons.map(i => i.id)

	return (
		<Fragment>
			<div className="form-row">
				<div className="single-row">
					<label>С кем </label>
					<a href={ROUTE_LINKS.nokiaPeopleForm}>+ person</a>
				</div>
				<div className="single-row">
					{!!selectedPersons.length && (
						<div>
							{selectedPersons.map(person => (
								<NokiaPersonTag
									onRemove={() => handleRemovePerson(person)}
									person={person}
								/>
							))}
						</div>
					)}
				</div>
				<div className="single-row">
					Самые частые
					<div className="person-selector">
						{topPersons.map(person => {
							if (selectedPersonIds.includes(person.id)) {
								return null
							}
							return (
								<NokiaPersonTag
									onClick={() => handleAddPerson(person)}
									person={person}
								/>
							)
						})}
					</div>
				</div>
				<div className="single-row">
					<CollapseSection fold={true} header="Все подряд">
						<div className="person-selector">
							{persons.map(person => {
								if (selectedPersonIds.includes(person.id)) {
									return null
								}
								return (
									<NokiaPersonTag
										onClick={() => handleAddPerson(person)}
										person={person}
									/>
								)
							})}
						</div>
					</CollapseSection>
				</div>
			</div>
		</Fragment>
	)
}
