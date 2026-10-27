import "../css/SearchBar.css";
export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-field">
      <label htmlFor="search">Encontre um Pokémon</label>
      <input
        id="search"
        type="search"
        placeholder="Nome ou número. Ex.: Bulba ou 001"
        value={query}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
