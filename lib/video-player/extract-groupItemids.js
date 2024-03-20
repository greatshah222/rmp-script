export const extractGroupItemIds = (data) => {
	if (data === undefined || data === null) {
		return ""; // or handle the case however you want
	}

	const allIds = Object?.values(data).flat(); // Extract all values and flatten arrays
	const idsString = allIds.join(","); // Join IDs with commas

	return idsString;
};
