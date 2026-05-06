import { FunctionComponent } from 'preact'
import { AccordType } from 'api-types/accord.types'

import { AccordElement } from 'components/accord/accord-element'

/**
 * Компонент для See Also секции
 */
export const SeeAlsoSection: FunctionComponent<{ items: AccordType[] }> = ({ items }) => (
    <div className="see-also-list">
        {items.map(item => (
            <AccordElement
                key={item.id}
                {...item}
                isMostView={false}
                isNew={false}
                showAlf={false}
                showBaidge={false}
            />
        ))}
    </div>
)
