export const getData = async (currentPage) => {
	const url = `https://swapi.tech/api/people/?page=${currentPage}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();
	return data;
};
