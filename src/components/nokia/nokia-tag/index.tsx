import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'api-types/nokia.types'

import cs from 'classnames'

import './style.css'

type NokiaTagPropsType = {
	tag: NokiaTagType;
	onClick?: () => void;
	isActive?: boolean;
};
export const NokiaTag: FunctionComponent<NokiaTagPropsType> = ({ tag, onClick: handleClick, isActive }) => (
	<div
		className={cs('tag__item', { 'tag__item--active': isActive })}
		onClick={handleClick}
	>
		{tag.name}
	</div>
);
