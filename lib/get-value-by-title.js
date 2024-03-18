export function getValueByTitle(items, title) {
	const item = items?.find((el) => el.title === title);
	const value = Boolean(item?.value);
	return value;
}
