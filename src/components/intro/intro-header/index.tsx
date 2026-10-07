import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type IntroHeaderPropsType = ClassNameType

// TODO: [FEATURE] надо все эти хэдеры в один объединить и variant="" составить
export const IntroHeader: FunctionComponent<IntroHeaderPropsType> = ({ children, className }) => (
	<h2 className={cs('intro-header', className)}>{children}</h2>
)
