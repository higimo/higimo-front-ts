export function plural(number: number, words: [string, string, string]) {
	const n = Math.abs(number) % 100;
	const n1 = n % 10;

	if (n > 10 && n < 20) {
		return words[2];
	} else if (n1 === 1) {
		return words[0];
	} else if (n1 >= 2 && n1 <= 4) {
		return words[1];
	} else {
		return words[2];
	}
}
