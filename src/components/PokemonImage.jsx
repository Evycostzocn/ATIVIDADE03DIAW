import { useState } from "react";
import usePokemonImage from "../hooks/usePokemonImage.js";
import { markPokemonImageUnavailable } from "../services/pokemonImages.js";
import "../css/PokemonImage.css";

export default function PokemonImage({ pokemon, size = "card" }) {
  // A chave reinicia o estado visual caso esta posição passe a mostrar outro Pokémon.
  return <ImageContent key={pokemon.id} pokemon={pokemon} size={size} />;
}

function ImageContent({ pokemon, size }) {
  const { url } = usePokemonImage(pokemon.id);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const unavailable = failed || url === null;
  const loading = !unavailable && !loaded;
  return (
    <span
      className={`pokemon-image pokemon-image--${size}`}
      aria-busy={loading}
    >
      {(loading || unavailable) && (
        <span
          className="image-placeholder"
          role="img"
          aria-label={`${loading ? "Carregando imagem" : "Imagem indisponível"} de ${pokemon.name}`}
        >
          <span aria-hidden="true">{loading ? "◌" : "◇"}</span>
          <small aria-hidden="true">
            {loading ? "Carregando…" : "Sem imagem"}
          </small>
        </span>
      )}
      {url && !failed && (
        <img
          className={loaded ? "is-loaded" : ""}
          src={url}
          alt={pokemon.name}
          aria-hidden={!loaded}
          width="96"
          height="96"
          onLoad={() => setLoaded(true)}
          onError={() => {
            markPokemonImageUnavailable(pokemon.id);
            setFailed(true);
          }}
        />
      )}
    </span>
  );
}
