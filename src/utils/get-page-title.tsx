import { SITE_POSTFIX } from 'hook/use-page-title'

export const getPageTitle: () => string = () => {
	return document.title.replace(`| ${SITE_POSTFIX}`, '');
};
