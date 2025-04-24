import { FeedbackType } from "../types";

// Алгоритм распределения массива по дням года без повторения, но в течении дня это тот же элемент
export const getElementForToday = (elements: FeedbackType[]): FeedbackType => {
	const today = new Date();

	const startOfYear = new Date(today.getFullYear(), 0, 0);
	const diff = today.getTime() - startOfYear.getTime();
	const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
	const index = dayOfYear % elements.length;

	return elements[index];
};
