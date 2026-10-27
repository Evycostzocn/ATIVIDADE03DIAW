import { useEffect, useState } from "react";
import { loadPokemonImage } from "../services/pokemonImages.js";

export default function usePokemonImage(id) {
  const [result, setResult] = useState(null);
  useEffect(() => {
    let active = true;
    loadPokemonImage(id).then((url) => {
      if (active) setResult({ id, url });
    });
    // Não abortamos a requisição compartilhada: outro componente pode usá-la.
    return () => {
      active = false;
    };
  }, [id]);
  return result?.id === id ? result : { id, url: undefined };
}
