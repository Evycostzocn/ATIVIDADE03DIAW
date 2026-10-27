import PokemonImage from "./PokemonImage.jsx";
import { formatId, getTeam } from "../data/pokedex.js";
import "../css/Trainers.css";
export default function Trainers({ trainers, pokemon, onSelect }) {
  return (
    <div className="trainer-grid">
      {trainers.map((trainer) => (
        <article className="trainer-card" key={trainer.id}>
          <div className="trainer-heading">
            <span className="trainer-avatar" aria-hidden="true">
              {trainer.name.slice(0, 1)}
            </span>
            <div>
              <h3>{trainer.name}</h3>
              <p>
                {trainer.badges}{" "}
                {trainer.badges === 1 ? "insígnia" : "insígnias"}
              </p>
            </div>
          </div>
          <h4>Equipe · {trainer.pokemonIds.length} Pokémon</h4>
          {trainer.pokemonIds.length ? (
            <ul>
              {getTeam(trainer, pokemon).map((entry, slot) => (
                <li key={`${trainer.id}-${trainer.pokemonIds[slot]}-${slot}`}>
                  {entry ? (
                    <button
                      onClick={() => onSelect(entry)}
                      aria-label={`Ver detalhes de ${entry.name}, número ${formatId(entry.id)}`}
                    >
                      <PokemonImage pokemon={entry} size="team" />
                      <span className="trainer-pokemon-name">
                        <small>#{formatId(entry.id)}</small> {entry.name}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  ) : (
                    <span>
                      Pokémon #{trainer.pokemonIds[slot]} indisponível
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum Pokémon associado a este treinador.</p>
          )}
        </article>
      ))}
    </div>
  );
}
