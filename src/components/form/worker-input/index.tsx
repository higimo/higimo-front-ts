import { WorkerType } from '../../../types'

import { useForm } from 'react-hook-form'
import useApi, { API_STATUS } from '../../../hook/use-api'

import sendRequest from '../../../utils/send-request'

import { ChooseInput } from '../../form/choose-input'
import { Tag } from '../../ui/tag'

import { API_ROUTE } from '../../../api-route'
import { NotFoundData } from '../../ui/not-found-data'
import { Loading } from '../../accord/accord-single'

const onSubmit = values => {
	console.log('onSubmit', values)
	// sendRequest('/api/v1/project/worker' + (!!values.id ? `/${values.id}` : ''), {
	// 	method: 'POST',
	// 	values,
	// }).then(data => console.log(data))
}

const TagInput = () => {
	const { register, handleSubmit } = useForm({})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Теги</label>
			<input {...register('tags')} name="tags" />
			<button type="submit" className="default-form__submit">Enter</button>
		</form>
	)
}

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export const WorkerInput = ({ projectId }) => {
	const [ workers ] = useApi<WorkerType>(API_ROUTE.projectWorker)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(workers.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === workers.status && !workers.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="worker-input">
			<h3>Участники анонса</h3>
			<ChooseInput
				items={workers}
				renderItem={(item, isChoosed, toggleChooseItem, register) => (
					<div className="choose-input__item">
						<Tag onClick={() => toggleChooseItem(item.id)}>
							{item.name} {item.family} {item.login && `(${item.login})`}
						</Tag>
						{isChoosed && <input ref={register} name={`role[${item.id}]`} />}
					</div>
				)}
				onSave={async (values) => {
					const requests = values.choose.split(',').map(async value => {
						const role = (values.role[value] || 'unknow');
						await delay(150)
						return await sendRequest('/api/v1/project/credits', {
							method: 'POST',
							values: {
								worker: value,
								project: projectId,
								role,
							}
						})
					})
					const totaly = await Promise.all(requests)
					// Проверяем, что все циферки (там id приходят)
					return totaly.reduce((a, i) => a && Number.isInteger(i), true)
				}}
			/>
				{/*
				appendItem={appendItem}
				onCreateNewChooseItem={({name, family, login}) => {
					appendItem({id: 12, name, family, login})
				}}
				getInputs={(register) => {
					return [
						<input
							ref={register}
							name="name"
							className="choose-input-create__input"
							placeholder="name"
							autocomplete="off"
						/>,
						<input
							ref={register}
							name="family"
							className="choose-input-create__input"
							placeholder="family"
							autocomplete="off"
						/>,
						<input
							ref={register}
							name="login"
							className="choose-input-create__input"
							placeholder="login"
							autocomplete="off"
						/>
					]
				}}*/}
		</div>
	)
}
