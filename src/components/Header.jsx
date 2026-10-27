import "../css/Header.css";
export default function Header({ page, onNavigate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#main">
          <span className="pokeball" aria-hidden="true" />
          POKÉDEX <span className="edition">/ KANTO</span>
        </a>
        <nav aria-label="Navegação principal">
          {[
            ["pokemon", "Pokédex"],
            ["trainers", "Treinadores"],
          ].map(([key, label]) => (
            <button
              key={key}
              aria-current={page === key ? "page" : undefined}
              onClick={() => onNavigate(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
