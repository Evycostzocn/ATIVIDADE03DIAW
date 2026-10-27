import PokemonImage from "./PokemonImage.jsx";
import { formatId } from "../data/pokedex.js";
import PokemonStats from "./PokemonStats.jsx";
import TypeBadges from "./TypeBadges.jsx";
import "../css/PokemonCard.css";
export default function PokemonCard({ pokemon, onSelect }) {
  return (
    <article
      className={`pokemon-card accent-${pokemon.types[0]?.name.toLowerCase() ?? "unknown"}`}
    >
      <div className="card-top">
        <div className="device-lights" aria-hidden="true">
          <span className="device-lens" />
          <span className="device-led led-red" />
          <span className="device-led led-yellow" />
          <span className="device-led led-green" />
        </div>
        <span className="record-number">Nº {formatId(pokemon.id)}</span>
      </div>
      <div className="device-screen">
        <PokemonImage pokemon={pokemon} />
        <div className="screen-trim" aria-hidden="true">
          <span />
          <i />
        </div>
      </div>
      <h3>
        <button
          className="card-trigger"
          onClick={() => onSelect(pokemon)}
          aria-label={`Ver detalhes de ${pokemon.name}`}
          aria-haspopup="dialog"
        >
          {pokemon.name}
        </button>
      </h3>
      <TypeBadges types={pokemon.types} />
      <PokemonStats pokemon={pokemon} />
      <div className="device-controls" aria-hidden="true">
        <span className="device-pad" />
        <span className="device-keys">
          <i />
          <i />
          <i />
        </span>
        <span className="device-speaker" />
      </div>
    </article>
  );
}
