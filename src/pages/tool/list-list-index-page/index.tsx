import { FunctionComponent } from 'preact'

import { ListList } from '../../../components/list/list-list'

export const ListListIndexPage: FunctionComponent = () => {
    document.title = 'Список списков'

    return (
        <div className="list-list">
            <ListList />
        </div>
    )
}
