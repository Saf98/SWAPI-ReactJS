import { useRef, forwardRef } from "react";

export const getData = async (currentPage) => {
  const url = `https://swapi.dev/api/people/?page=${currentPage}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
