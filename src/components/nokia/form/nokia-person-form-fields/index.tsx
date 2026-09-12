import { Fragment, FunctionComponent } from 'preact'
import { UseFormReturn } from 'react-hook-form'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

interface NokiaPersonFormFieldsProps {
	formMethods: UseFormReturn<NokiaPersonSimpleType>
}

export const NokiaPersonFormFields: FunctionComponent<NokiaPersonFormFieldsProps> = ({
	formMethods: { register },
}) => (
	<Fragment>
		<div className="form-row">
			<div className="form-row__label">
				<label>ID</label>
			</div>
			<div>
				<input
					{...register('id')}
					readOnly={true}
					name="id"
					type="number"
				/>
			</div>
		</div>

		<div className="form-row">
			<div className="form-row__label">
				<label>Имя</label>
			</div>
			<div>
				<input {...register('name')} name="name" />
			</div>
		</div>

		<div className="form-row">
			<div className="form-row__label">
				<label>Псевдоним</label>
			</div>
			<div>
				<input {...register('alias')} name="alias" />
			</div>
		</div>

		<div className="form-row">
			<div className="form-row__label">
				<label>Никнейм</label>
			</div>
			<div>
				<input {...register('nick')} name="nick" />
			</div>
		</div>

		<div className="form-row">
			<div className="single-row">
				<label>Описание</label>
			</div>
			<div className="single-row">
				<textarea {...register('description')} name="description" />
				<div className="support">
					<small>
						Аватарка, заметки про человека, вхождения в круги, знакомства с другими людьми, взгляды, аллергии, болезни, контактные данные, социальные сети, дата рождения, таланты, увлечения
					</small>
				</div>
			</div>
		</div>
	</Fragment>
)
