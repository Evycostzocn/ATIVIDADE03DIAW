import "../css/Filters.css";
export default function Filters({ types, type, onChange, onClear }) {
  return (
    <>
      <div className="filter-field">
        <label htmlFor="type">Filtrar por tipo</label>
        <select
          id="type"
          value={type}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Todos os tipos</option>
          {types.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </div>
      <button className="clear-button" onClick={onClear}>
        Limpar filtros
      </button>
    </>
  );
}
