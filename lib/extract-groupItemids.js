export const extractGroupItemIds = (data) => {
	const allIds = Object.values(data).flat(); // Extract all values and flatten arrays
	const idsString = allIds.join(","); // Join IDs with commas

	return idsString;
};
