import { FunctionComponent } from 'preact'
import { ListListForm } from '../../../components/list/list-list-form'

export const ListListFormPage: FunctionComponent = () => {
	document.title = 'Список списков'

	return (
        <div className="list-list">
            <ListListForm />
        </div>
	)
}
