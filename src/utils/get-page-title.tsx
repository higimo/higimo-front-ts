import { SITE_POSTFIX } from 'hook/browser/use-page-title'

export const getPageTitle: () => string = () => {
	return document.title.replace(`| ${SITE_POSTFIX}`, '');
};
