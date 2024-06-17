export const getData = async () => {
  const url = "https://swapi.dev/api/people/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
