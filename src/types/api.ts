const BASE_URL = "https://pokeapi.co/api/v2/";

function makeURL(path: string) {
  return `${BASE_URL}${path}`;
}

function makePokemonURL(id: string) {
  return makeURL(`pokemon/${id}/`);
}

function get(url: string) {
  return fetch(url, {
    mode: "cors"
  });
}

export async function fetchPokemon(id: string) {
  try {
    const response = await get(makePokemonURL(id));
    return response.json();
  } catch (e) {
    throw e;
  }
}
