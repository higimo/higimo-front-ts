import { FunctionComponent } from 'preact';
import { NokiaTagType } from '../../../types';

import cs from 'classnames'

import { useContext } from 'preact/hooks';

import { NokiaContext, NokiaContextType } from '../../../context/nokia';

type NokiaTagsGalleryPropsType = {
    filter: NokiaTagType['id'];
    updateFilter: (tag: NokiaTagType["id"]) => void;
}
export const NokiaTagsGallery: FunctionComponent<NokiaTagsGalleryPropsType> = (props) => {
    const { tag } = useContext(NokiaContext) as NokiaContextType

    return (
        <div className="nokia-tags-gallery">
            {tag.map(item => (
                <div
                    className={cs('tag__item', { 'tag__item--active': item.id === props.filter})}
                    onClick={() => props.updateFilter(item.id)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    )
}