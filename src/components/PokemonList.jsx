import PokemonCard from "./PokemonCard.jsx";
import "../css/PokemonList.css";
export default function PokemonList({ pokemon, onSelect, onClear }) {
  if (!pokemon.length)
    return (
      <div className="empty-state">
        <span aria-hidden="true">◎</span>
        <h3>Nenhum Pokémon encontrado</h3>
        <p>Tente outro nome, número ou tipo para continuar explorando.</p>
        <button onClick={onClear}>Limpar pesquisa e filtro</button>
      </div>
    );
  return (
    <div className="pokemon-grid">
      {pokemon.map((entry) => (
        <PokemonCard key={entry.id} pokemon={entry} onSelect={onSelect} />
      ))}
    </div>
  );
}
