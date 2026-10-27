// IDs 1–151 conferidos contra o catálogo da PokéAPI. Apenas a URL é aproveitada.
// A Promise fica no cache após terminar, inclusive quando resulta em falha (null).
const requests = new Map();

export function loadPokemonImage(id) {
  if (!requests.has(id)) {
    const request = (async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
          {
            signal: AbortSignal.timeout(15000),
          },
        );
        if (!response.ok) return null;
        const data = await response.json();
        const url = data.sprites?.front_default;
        return typeof url === "string" && url.trim() ? url : null;
      } catch {
        return null;
      }
    })();
    requests.set(id, request);
  }
  return requests.get(id);
}

export function markPokemonImageUnavailable(id) {
  requests.set(id, Promise.resolve(null));
}
