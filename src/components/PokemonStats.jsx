import { stats } from "../data/pokedex.js";
export default function PokemonStats({ pokemon }) {
  return (
    <dl className="stats">
      {stats.map(([key, label]) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd>{pokemon.stats[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
