const API_LOGIN = "onestlapourvous";
const API_KEY = "so4c0d00de65b6aae5842f3e6f4a32040c0f5f7058";

const countryMapping: any = {
  France: "fr",
  Belgique: "be",
  Suisse: "ch",
  Luxembourg: "lu"
};

export const fetchSuggestions = async (
  country: string,
  stringRequest: string
) => {
  return fetch(
    `http://www.citysearch-api.com/${countryMapping[country]}/city?login=${API_LOGIN}&apikey=${API_KEY}&ville=${stringRequest}`
  ).then(d => {
    if (d.status === 200) {
      return d.json();
    } else {
      return new Error("Error fetching cities");
    }
  });
};
